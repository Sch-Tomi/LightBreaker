
<?php
    $this->load_lib("AuthenticationLib");
    $this->load_lib("MenuHelperLib");
    $this->load_lib("Config");

    $auth = $this->lib("AuthenticationLib");
    $helper = $this->lib("MenuHelperLib");
    $config =  $this->lib("Config");

?>
<div id="menubar">
    <div id="welcome">
        <img src="img/laser-beam.png" alt="">
        <a href="<?php echo $config->get("app_folder") ?>">Light Breaker</a>
    </div>
    <!--close welcome-->
    <div id="menu_items">
        <ul id="menu">
            <li class="<?php echo $helper->get_menu_item_class("/"); ?>"><a href="<?php echo $config->get("app_folder") ?>">Főoldal</a></li>
            <li class="<?php echo $helper->get_menu_item_class("/game"); ?>"><a href="game">Játék</a></li>
            <?php if ($auth->is_logged()) :?>
                <li class="<?php echo $helper->get_menu_item_class("/logout"); ?>"><a href="logout">Kijelentkezés</a></li>
            <?php else: ?>
                <li class="<?php echo $helper->get_menu_item_class("/login"); ?>"><a href="login">Bejelentkezés</a></li>
                <li class="<?php echo $helper->get_menu_item_class("/register"); ?>"><a href="register">Regisztráció</a></li>
            <?php endif; ?>

            <?php if ($auth->is_admin()): ?>
                <li class="<?php echo $helper->get_menu_item_class("/admin"); ?>"><a href="admin">Admin DashBoard</a></li>
            <?php endif; ?>
        </ul>
    </div>
    <!--close menu-->
</div>
