<?php

    class UrlParser
    {

        function __construct()
        {

        }

        public function parse($routes, $url){

            $keys = array_keys($routes);
            $matched_key = "";
            $matched_vars = "";

            foreach ($keys as $key) {
                if (preg_match($this->change_specials_to_regex($key), $url, $match_out)) {
                    $matched_vars = array_slice($match_out,1);
                    $matched_key = $key;
                    break;
                }
            }

            if ($matched_key != "") {
                return [$routes[$matched_key], $matched_vars];
            }else {
                return [$routes["404"], []];
            }

        }

        private function change_specials_to_regex($url)
        {
            $changed_url = str_replace("(:any)", "([[:alnum:]]+)", $url);
            $changed_url = str_replace("(:string)", "([[:alpha:]]+)", $changed_url);
            $changed_url = str_replace("(:num)", "([[:digit:]]+)", $changed_url);
            $changed_url = str_replace("/", "\/", $changed_url);

            return "/^".$changed_url."$/";
        }

    }


 ?>
