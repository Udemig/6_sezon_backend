import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Schema: Veritabanına kaydedilecek verinin formatını belirler
// @Schema: bu sınıfın bir mongoose schema'sı olduğunu belirtir
@Schema()
export class User {
  // @Prop: Mongodb belgesinin bir alanını tanımlar
  // required, unique gibi ifadeleri prop'a yazıyoruz
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  avatarUrl?: string;
}

// SchemaFactory.createClass, User sınfının bir mongoose şemasını oluşturur
// Yukarıdaki class'ı veritbanı ile iletişime geçmek için kullanılan şemaya çevirir
export const UserSchema = SchemaFactory.createForClass(User);
