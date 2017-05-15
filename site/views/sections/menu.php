<?php
    $this->load_lib("AuthenticationLib");
    $auth = $this->lib("AuthenticationLib");
?>


<div id="menubar">
    <div id="welcome">
        <img src="/img/laser-beam.png" alt="">
        <a href="/">Light Breaker</a>
    </div>
    <!--close welcome-->
    <div id="menu_items">
        <ul id="menu">
            <li class="current"><a href="/">Főoldal</a></li>
            <li class=""><a href="/game">Játék</a></li>
            <?php if ($auth->is_logged()) :?>
                <li class=""><a href="/logout">Kijelentkezés</a></li>
            <?php else: ?>
                <li class=""><a href="/login">Bejelentkezés</a></li>
                <li class=""><a href="/register">Regisztráció</a></li>
            <?php endif; ?>

            <?php if ($auth->is_admin()): ?>
                <li class=""><a href="/admin">Admin DashBoard</a></li>
            <?php endif; ?>
        </ul>
    </div>
    <!--close menu-->
</div>
