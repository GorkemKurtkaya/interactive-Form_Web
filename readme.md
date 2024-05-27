# Interactive Form Project

## Proje Amacı

Bu proje, adminlerin kullanıcılarla anket benzeri sorular paylaşabilmesi amacıyla geliştirilmiştir. Admin, giriş yaptıktan sonra formlar oluşturur ve bu formlara sorular ekler. Kullanıcılar, adlarını girdikten sonra soruları sırayla yanıtlar ve sonuçları gönderir. Admin, kullanıcıların verdiği yanıtları ve puanları görebilir.

## Teknolojiler

- Backend: NestJS
- Frontend: React
- Veritabanı: MongoDB

## Kurulum

### Backend

1. Projeyi klonlayın:

    ```sh
    git clone https://github.com/kullanıcı_adı/interactive-form-project.git
    cd interactive-form-project/backend
    ```

2. Gerekli paketleri yükleyin:

    ```sh
    npm install
    ```

3. Ortam değişkenlerini ayarlayın:

    `.env` dosyasında MongoDB bağlantı bilgilerini ve diğer gerekli değişkenleri tanımlayın.

4. Uygulamayı çalıştırın:

    ```sh
    npm run start
    ```

### Frontend

1. Frontend dizinine gidin:

    ```sh
    cd ../frontend
    ```

2. Gerekli paketleri yükleyin:

    ```sh
    npm install
    ```

3. Ortam değişkenlerini ayarlayın:

    `.env` dosyasında backend API URL'sini tanımlayın.

4. Uygulamayı çalıştırın:

    ```sh
    npm start
    ```

## Kullanım

### Admin Paneli

1. Admin olarak giriş yapın.
2. Form oluşturun.
   ![image](https://github.com/GorkemKurtkaya/interactive-Form_Web/assets/115563271/e40bd282-6395-4c95-8381-b5a59b0ac25f)

4. "Soru Ekle" kısmı ile sorularınızı ve soru tiplerini seçerek ekleyin.
   ![image](https://github.com/GorkemKurtkaya/interactive-Form_Web/assets/115563271/12f5fc61-3e9a-4d75-8916-b9a3b557f943)

6. Eğer Gerekirse Formun üstünde bulunan edit butonu ile form düzenlenebilir.
7. "Paylaş" butonu ile formu kullanıcıların çözümüne sunun.
   ![image](https://github.com/GorkemKurtkaya/interactive-Form_Web/assets/115563271/a49a0aff-35bb-4303-9889-4c651a956067)


### Kullanıcı Tarafı

1. Formu açın ve adınızı girin.
   ![image](https://github.com/GorkemKurtkaya/interactive-Form_Web/assets/115563271/8e734f41-9058-4e58-893f-7834c5a14b25)

3. Soruları sırayla yanıtlayın.
  ![image](https://github.com/GorkemKurtkaya/interactive-Form_Web/assets/115563271/6e7c25d7-ae65-44ed-a43f-f7fecf6b9542)

5. Sonuçları gönderin.

### Admin Yanıt Görüntüleme

1. Admin panelinden "Yanıtlar" kısmına gidin.
2. Oluşturduğunuz formlardaki sorulara kullanıcıların ne cevap verdiğini ve kaç puan verdiğini görüntüleyin.
   ![image](https://github.com/GorkemKurtkaya/interactive-Form_Web/assets/115563271/c82aa20c-3fe0-49f5-b838-14b92f6b07b7)


## Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Lütfen bir pull request oluşturun veya bir issue açın.

## Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

