<?php

    /*
    *   Specials:
    *       (:any)
    *       (:string)
    *       (:num)
    */


    $this->route['GET']['/'] = 'Main';
    $this->route['GET']['404'] = 'Errors/show_404';

    $this->route['GET']['/game'] = "Main/game";

    $this->route['POST']['/login'] = "Auth/login";

    $this->route['GET']['/register'] = "Auth/register";
    $this->route['POST']['/register'] = "Auth/do_register";








 ?>
