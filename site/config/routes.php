<?php

    /*
    *   Specials:
    *       (:any)
    *       (:string)
    *       (:num)
    */


    $this->route['GET']['/'] = 'Main';
    $this->route['GET']['404'] = 'Errors/show_404';

    $this->route['GET']['/game/(:num)'] = "Game/start";

    $this->route['GET']['/login'] = "Auth/login";
    $this->route['POST']['/login'] = "Auth/do_login";
    $this->route['GET']['/logout'] = "Auth/logout";

    $this->route['GET']['/register'] = "Auth/register";
    $this->route['POST']['/register'] = "Auth/do_register";








 ?>
