# 10.00 Challenge – Mobil Uygulama

**Amaç:** Kullanıcıların bir sayacı tam 10.00 saniyede durdurmaya çalıştığı ölçülebilir bir oyun. Firebase ile kullanıcı kimlik doğrulama, geçmiş denemeler ve canlı leaderboard içerir.

---

## 📦 Özellikler

- **Auth:** E-posta/şifre ile kayıt ve giriş.
- **Oyun Ekranı:** Başlat → sayaç başlar. Durdur → süre sabitlenir. Hedef: 10.00.
- **Geçmiş Denemeler:** Kullanıcı tüm denemelerini görebilir.
- **Leaderboard:** En düşük hataya sahip ilk 5 kullanıcı gerçek zamanlı görüntülenir.
- **Profil:** Kullanıcı bilgilerini görüntüleme ve düzenleme.

---

## 🛠 Teknolojiler

- React Native (Expo SDK)
- TypeScript
- Firebase Auth (E-posta/Şifre)
- Firestore
- Redux 

---

## 🗂 Veri Modeli (Firestore)

Uygulama Firebase Firestore kullanarak veri saklar. Veri yapısı aşağıdaki gibidir:

### Collections

#### `users/{uid}`
Kullanıcı profil bilgilerini saklar.

| Alan | Tip | Açıklama |
|------|-----|----------|
| `displayName` | string | Kullanıcının görünen adı |
| `createdAt` | timestamp | Hesap oluşturulma zamanı |

#### `attempts/{attemptId}`
Her deneme kaydını saklar.

| Alan | Tip | Açıklama |
|------|-----|----------|
| `uid` | string | Kullanıcı ID'si |
| `durationMs` | number | Kullanıcının sayaç süresi (ms) |
| `errorMs` | number | 10.00 hedefinden sapma (ms) |
| `device` | string | Kullanıcının cihaz bilgisi |
| `createdAt` | timestamp | Deneme zamanı (serverTimestamp) |

#### `leaderboard/{global}`
Global liderlik tablosu verilerini saklar.

| Alan | Tip | Açıklama |
|------|-----|----------|
| `top5` | array | En iyi 5 performansı içeren dizi |
| `top5[].uid` | string | Kullanıcı ID'si |
| `top5[].displayName` | string | Kullanıcının görünen adı |
| `top5[].bestErrorMs` | number | En iyi (en düşük) hata payı (ms) |
| `top5[].updatedAt` | timestamp | Güncelleme zamanı |

---

## Kurulum ve Çalıştırma

1. Repo klonlama:
```bash
git clone https://github.com/burcingungorr/tensecondschallenge.git
cd ten-seconds-challenge
```

2. Paketleri yükleme:
```bash
npx expo install
```

3. Projeyi çalıştırma:
 ```bash
npx expo start
```


---

## 🗂 Dosya Yapısı
```

ten-seconds-challenge/
│
├─ .env.example
├─ README.md
├─ package.json
├─ App.json
│
├─ app/
│   ├─ (tabs)/
│   │    ├─ _layout.tsx
│   │    ├─ history.tsx
│   │    ├─ index.tsx
│   │    ├─ leaderboard.tsx
│   │    └─ profile.tsx
│   ├─ _layout.tsx
│   ├─ auth.tsx
│   ├─ not-found.tsx
│   ├─ splash.tsx
│   └─ loading.tsx
│
├─ components/
│   ├─ AuthScreen/
│   │    ├─ LoginForm.tsx
│   │    └─ RegisterForm.tsx
│   │
│   ├─ HistoryScreen/
│   │    ├─ Histories.tsx
│   │    └─ HistoryCard.tsx
│   │
│   ├─ HomeScreen/
│   │    ├─ Header.tsx
│   │    ├─ Result.tsx
│   │    ├─ StartStopButton.tsx
│   │    └─ TimerDisplay.tsx
│   │
│   ├─ ProfileScreen/
│   │    ├─ AvatarPicker.tsx
│   │    ├─ EditProfileModal.tsx
│   │    ├─ LogOutButton.tsx
│   │    └─ ProfileInfo.tsx
│   │
│   ├─ LeaderScreen/
│   │    ├─ LeaderCard.tsx
│   │    └─ Leaders.tsx
│   │
│   └─ Header.tsx
│
├─ redux/
│   ├─ store.ts
│   └─ userSlice.ts
│
├─ constants/
│   └─ theme.ts
│
├─ hooks/
│   ├─ useTimer.ts
│   └─ useResponsive.ts
│
├─ firebaseConfig.js
│
└─ assets/
    ├─ images/
    ├─ avatars/
    └─ animations/
```
## Uygulama Görselleri

| | | | |
|--|--|--|--|
| <img width="320" src="https://github.com/user-attachments/assets/fd285d44-5e4e-48d7-87b5-289487a6991d" /> | <img width="320" src="https://github.com/user-attachments/assets/ed71d2e6-7fde-4c7f-9b35-aeaf822e4570" /> | <img width="320" src="https://github.com/user-attachments/assets/5228bbb5-d373-480a-9c1a-ae691a7a4bfa" /> | <img width="320" src="https://github.com/user-attachments/assets/aa0199ef-f48e-4330-9a61-7bd74a8979ba" /> |
| <img width="320" src="https://github.com/user-attachments/assets/af0a6b6f-b164-4a42-b6b8-1a1b6bc4a454" /> | <img width="320" src="https://github.com/user-attachments/assets/18707480-a0a9-4656-ba58-5142ceced92f" /> | <img width="320" src="https://github.com/user-attachments/assets/3b7e7408-6e41-4f30-82a8-2f9ed9507e35" /> | |
























