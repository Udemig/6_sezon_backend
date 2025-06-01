import { NextFunction, Request, Response } from "express";
import e from "../utils/error.js";
import c from "../utils/catch-async.js";
import upload from "../utils/cloudinary.js";
import { ExtendedFiles, Filters, Query } from "../types";
import { Gig } from "../models/gig.model.js";

// arama parametrelerinden gelen filtrrleri mongoose'a uygun formata getiren fonksiyon
const buildFilters = (query: Query): Filters => {
  const filters: Filters = {};

  if (query.category) filters.category = query.category;
  if (query.userId) filters.user = query.userId;
  if (query.min || query.max) {
    filters.packagePrice = {};

    if (query.min) filters.packagePrice.$gte = query.min;
    if (query.max) filters.packagePrice.$lte = query.max;
  }
  if (query.search) filters.title = { $regex: query.search, $options: "i" }; // insensetive (büyük-küçük harf)

  return filters;
};

export const getAllGigs = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const filters = buildFilters(req.query);

  const gigs = await Gig.find(filters).populate("user", "username profilePicture");

  if (gigs.length === 0) return next(e(404, "Aranılan kriterlere uygun hizmet bulunamadı"));

  res.status(200).json({
    message: "Hizmet verileri alındı",
    results: gigs.length,
    gigs,
  });
});

export const getGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const gig = await Gig.findById(req.params.id).populate("user");

  if (!gig) return next(e(404, "Aradığınız hizmet bulunamadı"));

  res.status(200).json({
    message: "Hizmet verisi alındı",
    gig,
  });
});

export const createGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // isteği atana kullanıcı satıcı hesabı değilse hata döndür
  if (!req.isSeller) return next(e(403, "Sadece satıcı hesapları hizmet oluşturabilir"));

  // fotoğrafların typescript tipini ayarla
  const files = req.files as unknown as ExtendedFiles;

  // kapak fotoğrafını clouinary'e yükle
  const coverImage = await upload(next, files.coverImage[0].path, "gig-images", 900, 600, "fill", "80");

  // diğer fotoğraflar için promise'ler oluştur
  const promises = files.images.map((image) => upload(next, image.path, "gig-images", 900, 600, "fill", "80"));

  // bütün resimleri tek seferde yükleyip sonuçları al
  const images = await Promise.all(promises);

  // resimleri req.body'e ekle
  req.body.coverImage = coverImage.secure_url;
  req.body.images = images.map((image) => image.secure_url);

  // özellikler metinin diziye çevir
  req.body.packageFeatures = req.body.packageFeatures.split(",");

  // yeni hizmet belgesi oluştur
  const savedGig = await Gig.create({ ...req.body, user: req.userId });

  res.status(201).json({
    message: "Hizmet başarıyla oluşturuldu",
    gig: savedGig,
  });
});

export const deleteGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // hizmet verisini bul
  const gig = await Gig.findById(req.params.id);

  // bulamazsa hata fırlat
  if (!gig) return next(e(404, "Aradığınız hizmet bulunamadı"));

  // hizmeti silmek isteyen kişi ile oluşturan kişi aynı mı?
  if (String(gig?.user) !== req.userId) return next(e(403, "Bu işlemi yapmaya yetkiniz yok"));

  // hizmeti sil
  await Gig.findByIdAndDelete(req.params.id);

  // client'a cevap gönder
  res.status(200).json({
    message: "Hizmet başarıyla kaldırıldı",
  });
});
