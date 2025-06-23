# Parallel Routes

- Parallel routes, aynı anda birden fazla bağımsız sayfayı aynı layout içerisinde ekrana basmaya yarar.

- Her sayfa kendi bağımsız yükleme mantığına sahiptir (loading,error)

- @Slot: @ işareti ile tanımlanan ve paralelel route olarak ekrana basılacak sayfalara denir.

- Slot olarak tanımlanan sayfalar layout'a prop olarak gider

- Layout üzreinden slot olarak tanımlı sayaları aynı anda veya koşullu olaraka ekrana basabiliriz

- - Biz, parallel routes ile aynı arayüzü 2-3 nomal component oluştururakda elde edebilirdik
- - Ama normal component'lar yerine next.js sayfaları `page.jsx`'leri ekrana bastık.
- - `Page.jsx` kendi otomatik loading/error mekanizmasına sahipken normal component'larda manuel yapılmalı
- - `Page.jsx` ile oluşturulan sayfalar urldeki parametreleri otomatik prop olarak alır
- - Slot page'ler SSR, SSG, metadata, hatta middleware desteğinden faydalanabilir.

# Intercepting Routes

- Önizlemeli Route
- Bir sayfaya yönlendiren linkte tıkladığımızda öncelikle bir modal açıp sayfa detaylarını modal üzerinden gösteririz. Kullanıcı sayfayı yenilerse bu sefer modal sayfanın kendisi gösterilir.
- Bu özellik genel olarak ürün/göndeir detay sayflarında, login/register sayfaların, form alanlarında karşımıza çıkar.
