import React, { SVGProps } from 'react';
//import images from "../../images/brands/gab-hk.png";
//import images from "../../images/brands/loreal-logo.png";

export default function TwilioLogo() {
  let brand;

  brand = window.sessionStorage.getItem('brand') as string;
  //console.log(brand);
  //console.log(brand == null);
  if (window.sessionStorage.getItem('brand') != 'null') brand = window.sessionStorage.getItem('brand') as string;
  else brand = 'loreal-logo';

  return <img src={require('../../images/brands/' + brand + '.png').default} />;
}
