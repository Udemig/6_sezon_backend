import { addressSchema, loginSchema, registerSchema, validateDto } from "./auth.dto.ts";
import AuthService from "./auth.service.ts";
import catchAsync from "./utils/index.ts";

class AuthController {
  register = catchAsync(async (req, res, next) => {
    // client'dan gelen verinin doğru formatta olduğunu kontrol et
    const body = await validateDto(registerSchema, req.body);

    // service katamanında gerekli sorguları yap
    const result = await AuthService.register(body);

    // cookileri belirle
    res.cookie("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
    });

    res.cookie("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000, // 1 saat
    });

    // client'a cevap gönder
    res.status(201).json(result);
  });

  login = catchAsync(async (req, res, next) => {
    const body = await validateDto(loginSchema, req.body);

    const result = await AuthService.login(body);

    res.cookie("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
    });

    res.cookie("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000, // 1 saat
    });

    res.status(200).json(result);
  });

  refresh = catchAsync(async (req, res, next) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token bulunamadı" });
      return;
    }

    const result = await AuthService.refresh(refreshToken);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000, // 1 saat
    });

    res.status(200).json(result);
  });

  logout = catchAsync(async (req, res, next) => {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Başarıyla çıkış yapıldı" });
  });

  getProfile = catchAsync(async (req, res, next) => {
    res.status(200).json(req.user);
  });

  addAddres = catchAsync(async (req, res, next) => {
    const body = await validateDto(addressSchema, req.body);

    const result = await AuthService.addAddress(req!.user?._id as string, body);

    res.status(201).json(result);
  });
}

export default new AuthController();
