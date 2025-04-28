<?php




require('session.php');
require('config/config.php');
require('classes/api.php');
$api = new Api;
require('./assets/vendor/tcpdf.php'); // Import TCPDF plugin


$ins_req_id = $api->decrypt_data($_GET['ID']);

$ins_req_data = $api->get_data_details_one_parameter('insurance request',$ins_req_id)[0];








$pdf = new TCPDF('Landscape', PDF_UNIT, array(216, 330.2), true, 'UTF-8', false);


$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Data Center Department');
$pdf->SetTitle('Insurance Request');
$pdf->SetSubject('Insurance Request');
$pdf->SetKeywords('Document, Collateralized');


$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);


$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
$pdf->SetMargins(12, 12, 12);
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

$pdf->SetFont('times', '', 10);
$pdf->AddPage();


if($ins_req_data['IS_AOG']=='1')
{
    $ins_req_data['IS_AOG'] = 'YES';
}else {
    $ins_req_data['IS_AOG'] = 'NO';
}



$ins_req_data['INCEP_SDT'] = date_create($ins_req_data['INCEP_SDT']);
$ins_req_data['INCEP_SDT'] = date_format($ins_req_data['INCEP_SDT'],"F d, Y");

$ins_req_data['INCEP_EDT'] = date_create($ins_req_data['INCEP_EDT']);
$ins_req_data['INCEP_EDT'] = date_format($ins_req_data['INCEP_EDT'],"F d, Y");

$ins_req_data['DD'] = date_create($ins_req_data['DD']);
$ins_req_data['DD'] = date_format($ins_req_data['DD'],"F d, Y");


$calculator = '

<table border="1" width="100%" cellpadding="4" align="left">
    <thead>
        <tr>
            <th width="100%" align="center">INSURANCE PREMIUM CALCULATOR</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td width="13%">NAME:</td>
            <td width="47%">'.strtoupper($ins_req_data['CLIENT_NAME']).'</td>
            <td width="17%">INSURANCE COMPANY:</td>
            <td width="23%">'.strtoupper($api->get_system_description('INSCODEACRED',$ins_req_data['INS_CODE'])) .'</td>
        </tr>
        <tr>
            <td width="13%">ADDRESS:</td>
            <td width="47%">'.strtoupper($ins_req_data['ADDRESS']) .'</td>
            <td width="17%">CLASSIFICATION:</td>
            <td width="23%">'.strtoupper($api->get_system_description('ISRCLASS',$ins_req_data['INS_CLAS'])) .'</td>
        </tr>
        <tr>
            <td width="13%">UNIT:</td>
            <td width="47%">'.strtoupper($ins_req_data['UNIT_DESC']).'</td>
            <td width="17%">COVERAGE:</td>
            <td width="23%">'.number_format($ins_req_data['COVERAGE'],2).'</td>
        </tr>
        <tr>
            <td width="13%">PLATE NO.:</td>
            <td width="47%">'.strtoupper($ins_req_data['PLATE_NUM']).'</td>
            <td width="17%">RATE:</td>
            <td width="23%">'.number_format( $ins_req_data['RATE'],2).'%</td>
        </tr>
        <tr>
            <td width="13%">CHASIS NO.:</td>
            <td width="47%">'.$ins_req_data['CHASIS_NUM'].'</td>
            <td width="17%">OD/THEFT/LOSS:</td>
            <td width="23%">'.number_format($ins_req_data['ODTL'],2).'</td>
        </tr>
        <tr>
            <td width="13%">MOTOR NO.:</td>
            <td width="47%">'.$ins_req_data['MOTOR_NUM'].'</td>
            <td width="17%">OTHER LINES:</td>
            <td width="23%">'.$ins_req_data['OTHER_LINES'].'</td>
        </tr>
        <tr>
            <td width="13%">MODEL:</td>
            <td width="47%">'.$ins_req_data['YEAR_MOD'].'</td>
            <td width="17%">BODILY INJURED:</td>
            <td width="23%">'.number_format($ins_req_data['BODIN'],2).'</td>
        </tr>
        <tr>
            <td width="13%">COLOR:</td>
            <td width="47%">'.$ins_req_data['COLOR'].'</td>
            <td width="17%">PROPERTY DAMAGE:</td>
            <td width="23%">'.number_format($ins_req_data['PTDMG'],2).'</td>
        </tr>
        <tr>
            <td width="13%">INCEPTION DATE:</td>
            <td width="47%">'.strtoupper($ins_req_data['INCEP_SDT']) .' TO '.strtoupper($ins_req_data['INCEP_EDT']) .'</td>
            <td width="17%">PERSONAL ACCIDENT:</td>
            <td width="23%">'.number_format($ins_req_data['PERACC'],2).'</td>
        </tr>
        <tr>
            <td width="13%">MORTGAGEE:</td>
            <td width="47%">ENCORE LEASING & FINANCE CORP.</td>
            <td width="17%">WITH AOG?</td>
            <td width="23%">'.$ins_req_data['IS_AOG'] .'</td>
        </tr>
        <tr>
            <td width="13%">CONTACT NOS.:</td>
            <td width="47%">(044) 640-5625</td>
            <td width="17%">GROSS PREMIUM:</td>
            <td width="23%">'.number_format($ins_req_data['GP'] ,2).'</td>
        </tr>
        <tr>
            <td width="100%" align="center">Note: Rate used on AON is 5%</td>
        </tr>
    </tbody>
</table>';


$pdf->writeHTML($calculator, true, false, true, false, '');
$pdf->ln(-6);




$pdf->Ln(3);
$pdf->Cell(80, 7, ' COMPUTATION OF INCOME VERSION', 1, 0, 'C');
$pdf->Cell(10, 7, '', 'LR', 0, 'C');
$pdf->Cell(80, 7, ' PRO-RATA COMPUTATION', 1, 0, 'C');
$pdf->Cell(10, 7, '', 'LR', 0, 'C');
$pdf->Cell(80, 7, ' DUE DATE DERIVATION', 1, 0, 'C');
$pdf->Ln();
$pdf->Cell(40, 7, ' TOTAL PREMIUM', 1, 0, 'L');
$pdf->Cell(40, 7, number_format($ins_req_data['TOTALPREM'], 2), 1, 0, 'R');
$pdf->Cell(10, 7, '', 'LR', 0, 'C');
$pdf->Cell(40, 7, ' MONTHS', 1, 0, 'L');
$pdf->Cell(40, 7, ' ', 1, 0, 'L');
$pdf->Cell(10, 7, '', 'LR', 0, 'C');
$pdf->Cell(40, 7, ' START DATE', 1, 0, 'L');
$pdf->Cell(40, 7, $ins_req_data['INCEP_SDT'], 1, 0, 'R');
$pdf->Ln();
$pdf->Cell(40, 7, ' NET AMOUNT', 1, 0, 'L');
$pdf->Cell(40, 7, number_format($ins_req_data['NETMT'], 2), 1, 0, 'R');
$pdf->Cell(10, 7, '', 'LR', 0, 'C');
$pdf->Cell(40, 7, ' '. $ins_req_data['PRM'], 1, 0, 'L');
$pdf->Cell(40, 7, number_format($ins_req_data['PRM_AM'], 2), 1, 0, 'R');
$pdf->Cell(10, 7, '', 'LR', 0, 'C');
$pdf->Cell(40, 7, ' DUE DATE', 1, 0, 'L');
$pdf->Cell(40, 7, $ins_req_data['DD'] , 1, 0, 'R');
$pdf->Ln();
$pdf->Cell(40, 7, ' INCOME', 1, 0, 'L');
$pdf->Cell(40, 7, number_format($ins_req_data['INCOME'], 2), 1, 0, 'R');








$pdf->Output('Insurance Request.pdf', 'I');














?>