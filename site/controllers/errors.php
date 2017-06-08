<?php

class Errors extends LightController{

    private $messages;

    function __construct(){
        parent::__construct();

        $this->view->set_template("basic");

        $this->view->add_style("css/style.css");
        $this->view->add_style("css/error.css");

        $this->view->add_section("menu", "sections/menu");
        $this->view->add_section("footer", "sections/footer");

        $this->set_messages();
    }

    public function show($errorCode){
        $this->view->show("error", array('status' => $errorCode , "message" => $this->messages[$errorCode] ));
    }

    public function show_404(){
        $this->show(404);
    }

    private function set_messages()
    {
        $this->messages = array('404' => "Hé Te! Ne Hackeld a rendszerem!",
                                '403' => "Hát sajnos ehhez nincs jogog! :(");
    }
}


 ?>
