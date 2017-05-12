<div class="login-card">
    <h1>Regisztráció</h1><br>
    <form class="" action="/register" method="post">
        <input type="text" name="name" value="" placeholder="Név">
        <input type="email" name="email1" value="" placeholder="e-mail (user@domain.com)">
        <input type="email" name="email2" value="" placeholder="e-mail (user@domain.com)">
        <div data-tip="Tartalmaznia kell:
                        • kisbetűt,
                        • nagybetűt,
                        • számot,
                        • speciális karaktert.
                        Valamint legyen 8-20 hosszú.">
            <input type="password" name="pw1" value="" placeholder="Jelszó" pattern=".*^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$">
        </div>
        <div data-tip="Tartalmaznia kell:
                        • kisbetűt,
                        • nagybetűt,
                        • számot,
                        • speciális karaktert.
                        Valamint legyen 8-20 hosszú.">
            <input type="password" name="pw2" value="" placeholder="Jelszó" pattern="#.*^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$#">
        </div>

        <input class="login login-submit" type="submit" name="" value="Regisztráció">
    </form>

    <div class="login-help">
      <a href="/login">Bejelentkezés</a>
    </div>
</div>
