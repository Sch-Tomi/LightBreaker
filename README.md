# Light Breaker
Puzzle game written in JS with PHP server side.

This is my homework for Web Development 2 subject.

## Installing

1. You have to copy site folder content to your webhost.
2. If you copied in a folder on your host (so the game will be avaliable like mygame.com/game1/ ) then you have to change /config/config.php app_folder variable to the folder name. (so in this example "/game1")
3. Set permissions the db files.
    - /lib/DataBase/db
4. Default admin login: admin@admin.hu pw.: admin
5. Default user login: test@test.com pw.: ASDqwe123'"+


## Task:

### A játék célja

Minden egyes feladványnál rendezd el úgy a megadott objektumokat a táblán, hogy megvilágítsd a feladványban megjelölt számú célpontot.

### Objektumok

- Lézer: innen indul a lézersugár a nyíl irányában. ![Laser](site/img/blocks/lezer.png)
- Célpont/tükör: használható célpontként, tükörként vagy egyszerre mindkettőként. Csak az objektum sötétebb háromszöggel jelzett oldala érvényes célpont. Ha piros körrel jelezve van, akkor az adott tükörnek mindenféleképpen célpontnak KELL lennie (de emellett használható tükörként is). Egyéb esetben célpontként, tükörként, vagy mindkét módon is viselkedhet. ![Laser](site/img/blocks/cel.png) ![Laser](site/img/blocks/tukor.png)
- Féligáteresztő tükör: kétfelé választja a lézersugarat. Az egyik sugár 90 fokkal megtörve halad tovább, míg a másik a tükrön keresztül egyenesen halad tovább. ![Laser](site/img/blocks/felig.png)
- Dupla tükör: az objektum mindkét oldala 90 fokban töri meg a sugár útját. ![Laser](site/img/blocks/dupla.png)
- Ellenőrzőpont: olyan objektum, amelyen a lézersugárnak mindenképpen át kell haladnia. ![Laser](site/img/blocks/ellenorzo.png)
- Blokkoló: foglalja a helyet, ahol a blokkoló van, oda más objektum nem kerülhet. A lézersugár útját nem akadályozza. ![Laser](site/img/blocks/blokkolo.png)

### A játék menete

A játék egy 5x5-ös táblán zajlik, erre kell elhelyezni az adott feladványban szereplő összes objektumot. A feladvány három információt tartalmaz (ld. lent a Pályák részt):

- A tábla kezdeti állapota. A feladvány tartalmazza a tábla kezdeti állapotát. Néhány objektum előre fel van téve a táblára. Ezek helyét változtatni nem szabad. Forgatni akkor nem szabad, ha az objektum jobb felső sarkában egy kis lakat ikon jelenik meg. Ha nincs ott a lakat ikon, akkor az objektum 90 fokonként elforgatható.
- A hozzáadandó elemek. Ugyancsak meg vannak a tábla mellett adva azok az elemek, amelyeket fel KELL rakni a táblára a feladat megoldásához. Ezek az elemek más elemekre nem rakhatók, viszont tetszőlegesen forgathatók 90 fokonként.
- A megvilágított célpontok száma. A feladvány tartalmazza, hogy hány célpontot kell megvilágítani a lézernek. A piros körrel jelzett tükrök cél oldalát mindenféleképpen el kell találni, de lehet, hogy piros körrel expliciten nem jelzett tükör cél oldalát kell eltalálni.

A feladat megoldásához a feladványban szereplő összes objektumot fel kell használni. Pontosan a feladványkártyán szereplő mennyiségű célpontot kell aktiválni. A lézersugárnak minden, a feladványban felsorolt objektumot érintenie kell legalább egyszer (kivéve a blokkolót). A feladat akkor van megoldva, ha a lézersugár a megadott mennyiségű célpontot aktiválta, és (a blokkoló kivételével) minden jelzőt érintett legalább egyszer.
Működés és segítség

Nincs elvárás arra vonatkozóan, hogy milyen technológiával (táblázat vagy canvas) oldod meg a feladatot, továbbá a megjelenést és működést illetően sincsenek kőbe vésett elvárások. Kiválasztva egy feladatot, jelenjen meg a feladvány, és valamilyen módon legyen lehetőség megoldani.

Az objektumok mozgatása többféleképpen is történhet: lehet drag and dropot használni (például így), de úgy is lehet, hogy rákattintva csak kijelölöd, majd egy másik helyre kattintva jelzed, hova szeretnéd mozgatni. Az objektumok forgatására is többféle elképzelés lehetséges: ha drag and dropod van, akkor rákattintva foroghat; ha kijelölöd kattintásra, akkor bevezethetsz két gombot, ami balra és jobbra forgatja 90 fokkal; de az is lehet, hogy bal gombbal kijelölsz, jobb gombbal forgatsz.

### Szerver oldal

**Feladatok**

- A főoldalon legyen egy logó és egy rövid leírás a játékról.
- A főoldalon legyen egy link, amelyre kattintva bejön az első beadandó oldala, és ahol bárki játszhat a játékkal.
- Legyen lehetőség regisztrálni az alkalmazásba. Ehhez név, jelszó, email cím megadása szükséges. Mindegyik kötelező mező, email cím formátumának ellenőrzése szükséges (a formátum legyen feltüntetve az email mező környékén, pl. placeholderként).
- Legyen lehetőség bármikor belépni az alkalmazásba. Ehhez az email címet és jelszót kell megadni, mindkettő kötelező legyen, és vizsgáljuk az email mező megfelelő formátumát! Bejelentkezés után a regisztrációkor megadott név jelenik meg a felületeken. Bejelentkezett felhasználónak kilépésre is lehetőséget kell adni.
- Bejelentkezés után egy listaoldalra kerülünk, ahol a rendszerben tárolt pályák kerülnek felsorolásra. Egy pályánál fel kell tüntetni a nevét (pl. vagy azonosítóját, pl. "Advanced13"), a nehézségét, hányan oldották már meg, illetve a bejelentkezett felhasználó megoldotta-e már.
- A listában egy pályára kattintva egy másik oldalon a kiválasztott pályával lehet játszani. A játék végeztével a sikerességet AJAX hívással kell a szerverrel közölni és elmenteni a játékhoz, válaszként pedig az adott pályát sikeresen elvégzett játékosok listáját kell visszaadni és megjeleníteni.
- Legyen egy speciális felhasználó (név: admin, email: admin@admin.hu, jelszó: admin), aki belépve még egy funkcióhoz hozzáfér: új pálya felviteléhez. Itt megadhatja az új pálya nevét, nehézségét, és szerkesztheti a pályaelemeket: a táblán eredetileg fent lévő objektumokat, a felrakandó objektumokat és az akadályok számát. Hogy ezek megadása miként történik, nincs megkötve.
    - Lehet az, hogy valaki a játék "motorját" átalakítja és egy drag and drop-os felületet alakít ki.
    - Lehet az is, hogy valaki egy textarea-ban egy JSON szöveg szerkesztését követeli meg (érdemes valamilyen példafelépítést megadni).
    - De az is lehet, hogy valaki ennél egy fokkal egyszerűbb szöveges formátumot határoz meg (érdemes valamilyen példafelépítést megadni)
