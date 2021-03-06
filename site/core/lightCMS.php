<?php

    class LightCMS {

        private $libMan;
        private $urlParser;
        private $route;

        function __construct(){

            $this->load_basic_classes();

            $this->libMan = new LibManager;

            $this->libMan->load("UrlParser");
            $this->urlParser = new UrlParser;

            $this->libMan->load("Config");
            $this->config = new Config;


            $this->load_route();

        }

        public function run(){
            // URL feldolgozás
            $parsedUrl = $this->urlParser->parse($this->route, $_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD'], $this->config->get("app_folder"));
            $controllerName = explode("/", $parsedUrl[0]);
            $params = $parsedUrl[1];

            // Contorrel hívás
            $this->load_controller($controllerName[0]);
            $currentController = new $controllerName[0]();

            if(count($controllerName)==1){
                $currentController->index(...$params);
            }else{
                $functionName = $controllerName[1];
                $currentController->$functionName(...$params);
            }

        }

        private function load_route() {
            require_once(__DIR__.'/../config/routes.php');
        }

        private function load_basic_classes(){
            require_once(__DIR__.'/../lib/libManager.php');
            require_once(__DIR__.'/../models/modelManager.php');
            require_once(__DIR__.'/lightController.php');
            require_once(__DIR__.'/viewManager.php');
        }

        private function load_controller($className){
            require_once(__DIR__.'/../controllers/'.lcfirst($className).'.php');
        }

    }

 ?>
