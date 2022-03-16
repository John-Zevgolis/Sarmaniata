<?php

    $formerrors=false;
    $data=array();

    // if (isset($_POST['name'])) {

    //     $name=$_POST['name'];

    // }

    // if (isset($_POST['email'])) {

    //     $email=$_POST['email'];

    // }

    // if (isset($_POST['message'])) {

    //     $message=$_POST['message'];

    // }

    // if (isset($name)) {
    //     if (empty($name)) {

    //         $data["text"] = '<span class="error">The field is required</span>';
    //         $data["status"] = "error";
    //         echo json_encode($data);
    //         $formerrors=true;

    //     }
    // };

    // if (isset($email)) {
    //     if (empty($email)) {

    //         $data["text"] = '<span class="error">The field is required</span>';
    //         $data["status"] = "error";
    //         echo json_encode($data);
    //         $formerrors=true;

    //     } else if( !filter_var($email,FILTER_VALIDATE_EMAIL) ) {

    //         $data["text"] = '<span class="error">The email is invalid</span>';
    //         $data["status"] = "error";
    //         echo json_encode($data);
    //         $formerrors=true;

    //     }
    // };

    // if (isset($message)) {
    //     if (empty($message)) {

    //         $data["text"] = '<span class="error">The field is required</span>';
    //         $data["status"] = "error";
    //         echo json_encode($data);
    //         $formerrors=true;

    //     }
    // };

    if (!$formerrors) {
        /*$from = "testsite < mail@testsite.com >";
        $headers  = "From: $from \n";
        $headers .= "Cc: testsite < mail@testsite.com > \n";
        $headers .= "X-Sender: testsite < mail@testsite.com > \n";
        $headers .= 'X-Mailer: PHP/' . phpversion();
        $headers .= "X-Priority: 1 \n"; // Urgent message!
        $headers .= "Return-Path: mail@testsite.com\n"; // Return path for errors
        $headers .= "MIME-Version: 1.0 \r\n";
        $headers .= "Content-Type: text/html; charset=iso-8859-1 \n";*/
        $to="zevgolis.ioannis@gmail.com";
        $subject="Στοιχεια ενδιαφερόμενου " .$name;
        $body="Στοιχεια επισκέπτη \n";
        $body.="Ονομα: $name \n";
        $body.="Εmail: $email \n";
        $body.="Μηνυμα: $message \n";

        $r=mail($to,$subject,$body);

        $data["text"] = '<h2 class="alert alert-success text-center">Your message has been sent!</h2>';
        $data["status"] = "success";
        echo json_encode($data);

    } else {

        $data["text"] = '<h2 class="alert alert-danger text-center">There has been a technical issue</h2>';
        $data["status"] = "error";
        echo json_encode($data);

    }


?>