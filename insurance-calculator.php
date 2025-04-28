<?php
# -------------------------------------------------------------
#
# Name       : insurance-calculator.php
# Purpose    : This file return the calculated amount of the insurance request.
#
# Returns    : Array
#
# -------------------------------------------------------------
require('session.php');
require('config/config.php');
require('classes/api.php');
$api = new Api;

//mapped functions that need on this files
function getCalculatedDate($d1, $months){
    $date = new DateTime($d1);

    $newDate = $date->add(add_months($months, $date));

    $dateReturned = $newDate->format('m/d/Y'); 

    return $dateReturned;
}

function add_months($months, DateTime $dateObject){
    $next = new DateTime($dateObject->format('Y-m-d'));
    $next->modify('last day of +'.$months.' month');

    if($dateObject->format('d') > $next->format('d')) {
        return $dateObject->diff($next);
    } else {
        return new DateInterval('P'.$months.'M');
    }
}

function check_date_details_empty($date, $format){
    if(!empty($date)){
        return format_date($format, $date);
    }
    else{
        return '';
    }
}
function format_date($format, $date){
    $datestring = new DateTime($date);

    return $datestring->format($format);
}
//=================================================




// Check if insurance company, classification, insurance rate, coverage, other lines, with aog, inception start date
// number of days, prorata months and mortgagee is set



//$classification = $_POST['classifi'];







if(isset($_POST['insur_com']) 
    && isset($_POST['classifi'])
    && isset($_POST['rate']) 
    && isset($_POST['coverage'])
    && isset($_POST['otherlines'])
    && isset($_POST['aog']) 
    && isset($_POST['isd']) 
    && isset($_POST['nodays'])
    && isset($_POST['pro_r_m'])
    //&& isset($_POST['insured_elf'])
){






    $response = array();
    $inscomp = $_POST['insur_com'];
    $classification = $_POST['classifi'];
    $insrate = ($_POST['rate'] / 100);
    $coverage = floatval(preg_replace("/[^-0-9\.]/","", $_POST['coverage']));
    $otherlines = $_POST['otherlines'];
    $withaog = $_POST['aog'];
    $proratamonths = $_POST['pro_r_m'];
    //$insuretag = $_POST['insured_elf'];
    $inceptstartdate = $_POST['isd'];


    if ($classification == "TRUC" ) {
        $classification = '1';
    }elseif ($classification == "WAGCV") {
        $classification = '2';
    }elseif ($classification == "SEDPC") {
        $classification = '3';
    }elseif ($classification == "TAXI") {
        $classification = '4';
    }elseif ($classification == "RST") {
        $classification = '5';
    }











  
    
    if($classification == '1'){
        $rate = 0.027;
    }
    else if($classification == '2'){
        $rate = 0.02;
    }
    else if($classification == '3'){
        $rate = 0.027;
    }
    else if($classification == '4'){
        $rate = 0.045;
    }
    else{
        $rate = 0;
    }


    









    //Theft
    $theft = $coverage * $insrate;


    


    //Bodily Injured
    if($classification == '1' && $otherlines == '100K'){
        $bodilyinjured = 465;
    }
    else if($classification == '1' && $otherlines == '200K'){
        $bodilyinjured = 660;
    }
    else if($classification == '2' && $otherlines == '100K'){
        $bodilyinjured = 345;
    }
    else if($classification == '2' && $otherlines == '200K'){
        $bodilyinjured = 510;
    }
    else if($classification == '3' && $otherlines == '100K'){
        $bodilyinjured = 270;
    }
    else if($classification == '3' && $otherlines == '200K'){
        $bodilyinjured = 420;
    }
    else if($classification == '4' && $otherlines == '100K'){
        $bodilyinjured = 420;
    }
    else if($classification == '4' && $otherlines == '200K'){
        $bodilyinjured = 420;
    }
    else{
        $bodilyinjured = 0;
    }




    //Property Damange
    if($classification == '1' && $otherlines == '100K'){
        $propertydamage = 1290;
    }
    else if($classification == '1' && $otherlines == '200K'){
        $propertydamage = 1395;
    }
    else if($classification == '2' && $otherlines == '100K'){
        $propertydamage = 1170;
    }
    else if($classification == '2' && $otherlines == '200K'){
        $propertydamage = 1320;
    }
    else if($classification == '3' && $otherlines == '100K'){
        $propertydamage = 1095;
    }
    else if($classification == '3' && $otherlines == '200K'){
        $propertydamage = 1245;
    }
    else if($classification == '4' && $otherlines == '100K'){
        $propertydamage = 1245;
    }
    else if($classification == '4' && $otherlines == '200K'){
        $propertydamage = 1245;
    }
    else{
        $propertydamage = 0;
    }


    
 



    //Personal Accident
    if(($classification == '1' && $otherlines == '100K') || ($classification == '1' && $otherlines == '200K') || ($classification == '2' && $otherlines == '100K') || ($classification == '2' && $otherlines == '200K') || ($classification == '3' && $otherlines == '100K') || ($classification == '3' && $otherlines == '200K') || ($classification == '4' && $otherlines == '100K') || ($classification == '4' && $otherlines == '200K')){
        $personalaccident = 300;
    }
    else{
        $personalaccident = 0;
    }






    //AOG Coverage Amount
    if($withaog == '1'){
        $aogamt = $coverage * 0.005;
    }
    else{
        $aogamt = 0;
    }




    //Gross Amount
    if(!empty($classification)){
        $grossamount = ($theft + $bodilyinjured + $propertydamage + $personalaccident + $aogamt) * 1.25;
    }
    else{
        $grossamount = 0;
    }





    //Total Premium
    $totalpremium = $theft + $bodilyinjured + $propertydamage + $personalaccident + $aogamt;

    



    //Pro-Rata Amount
    if($proratamonths == '1'){
        $prorataamount = $totalpremium * 0.2;
    }
    else if($proratamonths == '2'){
        $prorataamount = $totalpremium * 0.3;
    }
    else if($proratamonths == '3'){
        $prorataamount = $totalpremium * 0.4;
    }
    else{
        $prorataamount = 0;
    }

    

    //Net Rate
    if($classification == '1'){
        $netrate = 0.019;
    }
    else if($classification == '2'){
        $netrate = 0.011;
    }
    else if($classification == '3'){
        $netrate = 0.014;
    }
    else{
        $netrate = 0;
    }

 

    //Income from Other Lines Rate
    if($inscomp == 'STA' || $inscomp == 'CIC' || $inscomp == 'STR'){
        $incomefromotherlinesrate = 0.1;
    }
    else if($inscomp == 'MER' || $inscomp == 'PEO'){
        $incomefromotherlinesrate = 0.3;
    }
    else{
        $incomefromotherlinesrate = 0;
    }



    //Agents Commission
    $agentscommission = $totalpremium * 0.15;



    //OD
    $od = ($coverage * $insrate) - ($coverage * $netrate);

    //BI
    $bi = $bodilyinjured * $incomefromotherlinesrate;

    //PD
    $pd = $propertydamage * $incomefromotherlinesrate;

    //PA
    $pa = $personalaccident * $incomefromotherlinesrate;

    //AOG
    if($withaog == '1'){
        $aog = $aogamt - ($coverage * 0.004);
    }
    else{
        $aog = 0;
    }

    //Tax Amount
    if($classification == '1' || $classification == '2' || $classification == '3' || $classification == '4'){
        $taxamount = ($bi + $pd + $pa) * 0.1;
    }
    else{
        $taxamount = 0;
    }

    //Sub Total
    $subtotal = ($bi + $pd + $pa) - $taxamount;

    //Income of Encore
    $income = $od + $aog + $subtotal;

    //Net Amount
    $netamount = $grossamount - $income;

    //Dealers Commission
    if(($classification == '1' && $insrate >= 0.027) || ($classification == '2' && $insrate >= 0.02) || ($classification == '3' && $insrate >= 0.027) || ($classification == '4' && $insrate >= 0.045)){
        $dealerscommission = $netamount * 0.25;
    }
    else{
        $dealerscommission = 0;
    }

    //Net Commission
    $netcommission = $income - $dealerscommission;

    if(!empty($inceptstartdate)){
        //Inception End Date
        $inceptionenddate = getCalculatedDate($inceptstartdate, 12);

        if(empty($_POST['nodays']) || $_POST['nodays'] <= 0){
            $nodays = '+ 0 days';
        }
        else{
            $nodays = '+ ' . $_POST['nodays'] . ' days';
        }

        //Due Date
        $date = new DateTime($inceptstartdate);
        $duedate = $date->modify($nodays);
        $duedate =  $duedate->format('m/d/Y');
    }
    else{
        $inceptionenddate = '';
        $duedate = '';
    }






    $response[] = array(
        'Theft' => $theft,
        'BodilyInjured' => $bodilyinjured,
        'PropertyDamage' => $propertydamage,
        'PersonnalAccident' => $personalaccident,
        'GrossPremium' => $grossamount,
        'TotalPremium' => $totalpremium,
        'NetAmount' => $netamount,
        'Income' =>$income,
        'ProrataAmount' => $prorataamount,
        'DealersCommission' => $dealerscommission,
        'NetCommission' => $netcommission,
        'DueDate' => check_date_details_empty($duedate, 'Y-m-d'),
        'InceptionEndDate' => check_date_details_empty($inceptionenddate, 'Y-m-d')
    );

    echo json_encode($response);
}
?>