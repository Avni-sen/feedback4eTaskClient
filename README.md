# Feedback4eTaskClient

Bu proje, Angular ve ASP.NET Core (.NET 6) kullanılarak geliştirilmiştir ve katmanlı bir mimariye sahiptir. Proje, bir Web API uygulamasıdır ve SQL Server veritabanını kullanmaktadır.Database .script olarak dışarı çıkartılmıştır bu database.script dosyası WebAPI KatmanındakiDatabase klasöründe mevcuttur.

Gereksinimler
Projenin çalışması için aşağıdaki gereksinimlerin yerine getirilmesi gerekmektedir:

.NET 6 SDK
Node.js ve Angular CLI (Angular projesi için)
Visual Studio Code veya Visual Studio (Tercih edilen IDE)
Proje Yapısı
Proje, aşağıdaki katmanlar tarafından oluşturulmuştur:

WebAPI: Web API uygulaması, ASP.NET Core ile oluşturulmuştur. Bu katmanda, API'ye yönelik tüm istekler işlenir ve veritabanı işlemleri gerçekleştirilir. Bu katman, diğer katmanlarla iletişim kurar.
Business: İş katmanı, iş mantığının yer aldığı katmandır. Bu katmanda, veritabanından gelen veriler işlenir ve iş kurallarına göre veriler hazırlanır.
DataAccess: Veri katmanı, veritabanı işlemlerinin yapıldığı katmandır. Bu katmanda, veritabanı bağlantısı ve veri işlemleri yer alır.
UI: Kullanıcı arayüzü katmanı, Angular ile oluşturulmuştur. Bu katmanda, kullanıcıların uygulama ile etkileşim kurduğu tüm bileşenler yer alır.
Veritabanı Yapısı
Proje, SQL Server veritabanını kullanmaktadır.


Kurulum
Projenin kurulumu için aşağıdaki adımları takip edebilirsiniz:

Projenin dosyalarını bilgisayarınıza indirin veya kopyalayın.
Veritabanı bağlantısı için, WebAPI katmanındaki appsettings.json dosyasındaki DefaultConnection ayarlarını değiştirin.
Veritabanını oluşturmak için, WebAPI katmanındaki Database klasörü içindeki Create.sql dosyasını SQL Server Management Studio veya benzeri bir araç ile çalıştırın.
API uygulamasını çalıştırmak için, WebAPI katmanındaki WebAPI.csproj dosyasını çalıştırın veya terminalde dotnet run komutunu çalıştırın.
Kullanıcı arayüzü için, UI katmanındaki package.json dosyasını kullanarak gerek
