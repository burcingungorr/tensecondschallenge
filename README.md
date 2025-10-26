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

2. Paketleri yükleme:
npx expo install

3. Projeyi çalıştırma:
npx expo start
```


---

## 🗂 Dosya Yapısı
ten-seconds-challenge/
│
├─ .env.example
├─ README.md
├─ package.json
├─ App.json
│
├─  app/
│    ├─ (tabs)/
│         ├─ _layout.tsx
│         ├─ history.tsx
│         ├─ index.tsx
│         ├─ leaderboard.tsx
│         └─ profile.tsx
│    ├─ _layput.tsx
│    ├─ auth.tsx
│    ├─ not-found.tsx
│    ├─ splash.tsx
│    └─ loading.tsx
│
├─  components/
│    ├─ AuthScreen/
│         ├─ LoginForm.tsx
│         └─ RegisterForm.tsx
│
│    ├─ HistoryScreen/
│         ├─ Histories.tsx
│         └─ HistoryCard.tsx
│ 
│    ├─ HomeScreen/
│         ├─ Header.tsx
│         ├─ Result.tsx
│         ├─ StartStopButton.tsx
│         └─ TimerDisplay.tsx
│       
│    ├─ ProfileScreen/
│         ├─ AvatarPicker.tsx
│         ├─ EditProfileModal.tsx
│         ├─ LogOutButton.tsx
│         └─  ProfileInfo.tsx
│
│    ├─  LeaderScreen/
│         ├─ LeaderCard.tsx
│         └─ Leaders.tsx
│
│    └─ Header.tsx
│  
│ 
├─  redux/
│     ├─ store.ts
│     └─ userSlice.ts
│
├─  constansts/
│     └─ theme.ts
│  
├─  hooks/
│    ├─ useTimer.ts
│    └─ useResponsive.ts
│  
├─  firebaseConfig.js
│
└─  assets/
    ├─ images/
    ├─ avatars/
    └─ animations/

## Uygulama Görselleri

<table>
  <tr>
    <td><img width="180" src="https://github.com/user-attachments/assets/4522e6f4-2900-408a-8e0b-6ce921ba8be5" /></td>
    <td><img width="180" src="https://github.com/user-attachments/assets/9f6f88a3-cb00-490b-91c7-482a7a2fe776" /></td>
    <td><img width="180" src="https://github.com/user-attachments/assets/9620a14c-621a-4b6d-b739-abff9969db7a" /></td>
    <td><img width="180" src="https://github.com/user-attachments/assets/c75172e7-ebea-4360-afdc-7f737fccc314" /></td>
  </tr>
  <tr>
    <td><img width="180" src="https://github.com/user-attachments/assets/12fe1b44-f3ee-4138-9d63-8fb6ba05df26" /></td>
    <td><img width="180" src="https://github.com/user-attachments/assets/e077bebc-02c9-4ff5-bc77-a8e0bf4430e7" /></td>
    <td><img width="180" src="https://github.com/user-attachments/assets/7f1829f2-1029-46cc-a88a-ffb772d1b249" /></td>
    <td></td>
  </tr>
</table>























