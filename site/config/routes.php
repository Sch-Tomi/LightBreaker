<?php

    /*
    *   Specials:
    *       (:any)
    *       (:string)
    *       (:num)
    */


    $this->route['/'] = 'Main';
    $this->route['404'] = 'Errors/show_404';

    $this->route['/game'] = "Game";

    $this->route['/login'] = "Auth/Login";
    $this->route['/product/(:any)/(:string)/(:num)'] = "PROD";






 ?>
