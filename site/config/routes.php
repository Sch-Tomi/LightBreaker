<?php

    /*
    *   Specials:
    *       (:any)
    *       (:string)
    *       (:num)
    */


    $this->route['GET']['/'] = 'Main';
    $this->route['GET']['404'] = 'Errors/show_404';
    $this->route['GET']['/error/(:num)'] = 'Errors/show';

    $this->route['GET']['/game'] = "Game/show_games";
    $this->route['GET']['/game/(:num)'] = "Game/start";

    $this->route['GET']['/login'] = "Auth/login";
    $this->route['POST']['/login'] = "Auth/do_login";
    $this->route['GET']['/logout'] = "Auth/logout";

    $this->route['GET']['/register'] = "Auth/register";
    $this->route['POST']['/register'] = "Auth/do_register";

    $this->route['GET']['/admin'] = "Admin/adminDash";
    $this->route['POST']['/admin/add'] = "Admin/add";
    $this->route['GET']['/admin/delete/(:num)'] = "Admin/del";






 ?>
