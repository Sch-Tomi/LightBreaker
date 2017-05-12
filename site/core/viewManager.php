<?php

    class ViewManager{

        private $template;
        private $sections;
        private $scripts;
        private $styles;

        private $libMan;

        public function __construct()
        {
            $this->sections = array();
            $this->scripts = array();
            $this->styles = array();

            $this->loads = array();
            $this->libMan = new LibManager;
        }

        public function set_template($template){
            $this->template = $template;
        }

        public function add_section($name, $section){
            $this->sections[$name] = $section;
        }

        public function add_script($file){
            array_push($this->scripts, $file);
        }

        public function add_style($file){
            array_push($this->styles, $file);
        }

        public function show($view, $data=''){
            require_once __DIR__."/../views/templates/".$this->template.".php";

        }

        public function load_lib($name){
            $this->loads[$name] = $this->libMan->load_and_create($name);
        }

        protected function lib($name){
            return $this->loads[$name];
        }

        protected function get_section($name){

            if(array_key_exists ($name, $this->sections)){
                try {
                    return file_get_contents(__DIR__."/../views/".$this->sections[$name].".php");
                } catch (Exception $e) {
                    return "";
                }
            }
            return "";
        }

        protected function load_section($name){

            if(array_key_exists ($name, $this->sections)){
                try {
                    require __DIR__."/../views/".$this->sections[$name].".php";
                } catch (Exception $e) {
                    return "";
                }
            }
            return "";
        }

        protected function get_view($name){
            return file_get_contents(__DIR__."/../views/".$name.".php");
        }

    }

 ?>
