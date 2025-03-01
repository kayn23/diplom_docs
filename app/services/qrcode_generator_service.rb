class QrcodeGeneratorService
  def self.generate_base64(string, size = 300)
    # Генерация QR-кода
    qrcode = RQRCode::QRCode.new(string)

    # Создание PNG изображения
    png = qrcode.as_png(
      resize_gte_to: false,
      resize_exactly_to: false,
      fill: 'white',
      color: 'black',
      size: size,
      border_modules: 4,
      module_px_size: 6,
      file: nil # Не сохранять в файл
    )

    # Кодирование в Base64
    base64_image = Base64.strict_encode64(png.to_s)
    "data:image/png;base64,#{base64_image}"
  end
end
