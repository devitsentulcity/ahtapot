import { Lottie } from '../components';
import React from 'react';
import { Rating } from 'react-native-ratings';
import images from '../index';
import RouteName from '../routes/RouteName';



export const Calenderdata = [
  {
    id: 1,
    title: "Sun",
    digit: "1",
  },
  {
    id: 2,
    title: "Mon",
    digit: "2",
  },
  {
    id: 3,
    title: "Tue",
    digit: "3",
  },
  {
    id: 4,
    title: "Thu",
    digit: "4",
  },
  {
    id: 5,
    title: "Wed",
    digit: "5",
  },
  {
    id: 6,
    title: "Fri",
    digit: "6",
  },
  {
    id: 7,
    title: "Sat",
    digit: "7",
  },
  {
    id: 8,
    title: "Sun",
    digit: "8",
  },
  {
    id: 9,
    title: "Mon",
    digit: "9",
  },
  {
    id: 10,
    title: "Tue",
    digit: "10",
  },
  {
    id: 11,
    title: "Thu",
    digit: "11",
  },
  {
    id: 12,
    title: "Wed",
    digit: "12",
  },
  {
    id: 13,
    title: "Fri",
    digit: "13",
  },
  {
    id: 14,
    title: "Sat",
    digit: "14",
  },
];

export const HomeTopSlider = [
  {
    id: 1,
    title: "Technical Ser...",
    Subtitle: "Pending",
    Secondtitle: "Incidents",
    SecondSubtitle: "2",
    Thirdtitle: "Estimates",
    ThirdSubtitle: "2",
    Fourthtitle: "Sales Orders",
    FourthSubtitle: "0",
    Fivetitle: "Delivery Notes",
    FiveSubtitle: "2",
    IconName: "miscellaneous-services",
    Price: "",
    Price2: "($ 0.00)",
    Price3: "($ 129.90)", 
    redirect: (RouteName.DRAWER_TECHNICAL_SERVICE)  
  },
  {
    id: 2,
    title: "Invoicing",
    Subtitle: "Pending",
    Secondtitle: "Invoice",
    SecondSubtitle: "4",
    Thirdtitle: "Refund Invoice",
    ThirdSubtitle: "0",
    Fourthtitle: "",
    FourthSubtitle: "",
    Fivetitle: "",
    FiveSubtitle: "",
    IconName: "insert-drive-file",
    Price1: "($ 500.07)",
    Price2: "($ 0.00)",
    Price3: "",   
    Price4: "",   
    redirect: (RouteName.DRAWER_CALLS_SCREEN)  
  },
  {
    id: 3,
    title: "Sales",
    Subtitle: "Pending",
    Secondtitle: "Estimates",
    SecondSubtitle: "1",
    Thirdtitle: "Sales Order",
    ThirdSubtitle: "2",
    Fourthtitle: "Delivery Notes",
    FourthSubtitle: "1",
    Fivetitle: "",
    FiveSubtitle: "",
    IconName: "tag",
    Price1: "($ 510.07)",
    Price2: "($ 300.00)",
    Price3: "($ 150.00)",   
    Price4: "",   
    redirect: (RouteName.WHISHILIST_TAB)  

  },
  {
    id: 4,
    title: "Purchases",
    Subtitle: "Pending",
    Secondtitle: "Sales Order",
    SecondSubtitle: "1",
    Thirdtitle: "Delivery Notes",
    ThirdSubtitle: "2",
    Fourthtitle: "Invoices",
    FourthSubtitle: "",
    Fivetitle: "",
    FiveSubtitle: "",
    IconName: "shopping-bag",
    Price1: "($ 510.07)",
    Price2: "($ 0.00)",
    Price3: "($ 150.00)",   
    Price4: "",   
    redirect: (RouteName.DRAWER_PURCHASE)  
  },  

];


export const Swiperdata = [
  {
    key: 's1',
    text: 'of customers see their CSAT improve by 50% or more. ',
    title: "Customer support software for any business, any size",
    animation: <Lottie
      source={require('../screens/LottiefilesAll/SwiperFirstAnimation.json')}
    />,
  },
  {
    key: 's2',
    text: 'of customers see an increase in agent productivity',
    title: 'Save time and lower costs.',
    animation: <Lottie
      source={require('../screens/LottiefilesAll/Swiperanimationtwo.json')}
    />,
    backgroundColor: 'transparent',
  },
  {
    key: 's3',
    text: 'of customers gain better visibility into their support operations',
    title: 'Boost customer satisfaction.',
    animation: <Lottie
      source={require('../screens/LottiefilesAll/SwiperAnimationThree.json')}
    />,
    backgroundColor: 'transparent',
  },

]
export const Countrydata = [
  {
    "id": 1,
    "textsimple": 'Afghanistan',
    "digit": '+ 93',
  },
  {
    "id": 2,
    "textsimple": 'Albania',
    "digit": '+ 355',
  },
  {
    "id": 3,
    "textsimple": 'Algeria',
    "digit": '+ 213',
  },
  {
    "id": 1,
    "textsimple": 'Belgium',
    "digit": '+ 32',
  },
  {
    "id": 4,
    "textsimple": 'Belize',
    "digit": '+ 501',
  },
  {
    "id": 5,
    "textsimple": 'Benin',
    "digit": '+ 229',
  },
  {
    "id": 6,
    "textsimple": 'Gambia',
    "digit": '+ 220',
  },
  {
    "id": 7,
    "textsimple": 'Georgia',
    "digit": '+ 995',
  },
  {
    "id": 8,
    "textsimple": 'Greece',
    "digit": '+ 30',
  },
  {
    "id": 9,
    "textsimple": 'Hong Kong',
    "digit": '+ 852',
  },
  {
    "id": 10,
    "textsimple": 'Iceland',
    "digit": '+ 354',
  },
  {
    "id": 11,
    "textsimple": 'India',
    "digit": '+ 91',
  },
  {
    "id": 12,
    "textsimple": 'Japan',
    "digit": '+ 81',
  },
  {
    "id": 13,
    "textsimple": 'Kazakhstan',
    "digit": '+ 7',
  },
  {
    "id": 14,
    "textsimple": 'Lebanon',
    "digit": '+ 961',
  },
  {
    "id": 15,
    "textsimple": 'Liberia',
    "digit": '+ 231',
  },
  {
    "id": 16,
    "textsimple": 'Liechtenstein',
    "digit": '+ 423',
  },
  {
    "id": 17,
    "textsimple": 'Luxembourg',
    "digit": '+ 352',
  },
  {
    "id": 18,
    "textsimple": 'Malawi',
    "digit": '+ 256',
  },
  {
    "id": 19,
    "textsimple": 'Maldives',
    "digit": '+ 960',
  },
  {
    "id": 20,
    "textsimple": 'Mexico',
    "digit": '+ 52',
  },
]

export const Details = [
  {
    id: '1',
    title: 'First Item',
    DataLabel: 'Abhyasam',
  },
  {
    id: '1',
    title: 'Company',
    DataLabel: 'Vyas',
  },
  {
    id: '1',
    title: 'Title',
    DataLabel: 'Title Demo',
  },
  {
    id: '1',
    title: 'Email',
    DataLabel: 'emaildemo@gmail.com',
  },
  {
    id: '1',
    title: 'Phone',
    DataLabel: '12456',
  }, {
    id: '1',
    title: 'Fax',
    DataLabel: '22365',
  },
  {
    id: '1',
    title: 'Mobile',
    DataLabel: '134567890',
  },
  {
    id: '1',
    title: 'Website',
    DataLabel: 'mailexample.com',
  },
  {
    id: '1',
    title: 'LeadSource',
    DataLabel: 'LeadSource',
  },
  {
    id: '1',
    title: 'LeadStatus',
    DataLabel: 'LeadStatus',
  },
  {
    id: '1',
    title: 'Industry',
    DataLabel: 'IndustryDemo',
  },
  {
    id: '1',
    title: 'NoofEmployee',
    DataLabel: '2',
  },
  {
    id: '1',
    title: 'Annual Revenue',
    DataLabel: '400 $',
  },
  {
    id: '1',
    title: 'rating',
    DataLabel: '5',
  },
  {
    id: '1',
    title: 'CreatedbyData',
    DataLabel: 'abhyasam',
  },

];

// catlog

export const Catalogdata = [
  {
    id: 1,
    title: "PR00001",
    boxiocn: "box",
    boxicontext: "30.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 30.00",
  },
  {
    id: 2,
    title: "PR00002",
    boxiocn: "box",
    boxicontext: "31.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 27.00",
  },
  {
    id: 3,
    title: "PR00003",
    boxiocn: "box",
    boxicontext: "32.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 35.00",
  },
  {
    id: 4,
    title: "PR00004",
    boxiocn: "box",
    boxicontext: "33.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 33.00",
  },
  {
    id: 5,
    title: "PR00005",
    boxiocn: "box",
    boxicontext: "34.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 36.00",
  },
  {
    id: 6,
    title: "PR00006",
    boxiocn: "box",
    boxicontext: "35.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 37.00",
  },
  {
    id: 7,
    title: "PR00007",
    boxiocn: "box",
    boxicontext: "36.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 39.00",
  },
  {
    id: 8,
    title: "PR00008",
    boxiocn: "box",
    boxicontext: "37.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 37.00",
  },
  
];
export const ClientListdata = [
  {
      "id": 1,
      "image": images.User_image_set,
      "text": 'Owld Light Ltd.',
      "texttwoset": 'OWL00002 - Owld Light',
      "expireddate": 'Exp.',
      "yeartext": '22 Years',
      "fees": 'Fees',
      "DigitdolaR": '$28',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={5}
          isDisabled={false}
      />
  },
  {
      "id": 2,
      "image": images.User_image_set,
      "text": 'Nigel Light Ltd.',
      "texttwoset": 'NIGEL0002 - Nigel Light',
      "expireddate": 'Exp.',
      "yeartext": '24 Years',
      "fees": 'Fees',
      "DigitdolaR": '$30',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={4.5}
          isDisabled={false}
      />
  },
  {
      "id": 3,
      "image": images.User_image_set,
      "text": 'Thiel Light Ltd.',
      "texttwoset": 'THIED - Thiel Light',
      "expireddate": 'Exp.',
      "yeartext": '21 Years',
      "fees": 'Fees',
      "DigitdolaR": '$35',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={5}
          isDisabled={false}
      />
  },
  {
      "id": 4,
      "image": images.User_image_set,
      "text": 'East East  Ltd.',
      "texttwoset": 'EAST0303 - East  Light',
      "expireddate": 'Exp.',
      "yeartext": '22 Years',
      "fees": 'Fees',
      "DigitdolaR": '$40',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={4.5}
          isDisabled={false}
      />
  },
  {
      "id": 5,
      "image": images.User_image_set,
      "text": 'Ridge Light Ltd.',
      "texttwoset": 'CLI00002 - Ridge Light',
      "expireddate": 'Exp.',
      "yeartext": '27 Years',
      "fees": 'Fees',
      "DigitdolaR": '$41',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={5}
          isDisabled={false}
      />
  },
  {
      "id": 6,
      "image": images.User_image_set,
      "text": 'Dr.Dreshal Son',
      "text": 'Premium Light Ltd.',
      "texttwoset": 'CLI00002 - Premium Light',
      "yeartext": '28 Years',
      "fees": 'Fees',
      "DigitdolaR": '$42',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={4.5}
          isDisabled={false}
      />
  },
  {
      "id": 7,
      "image": images.User_image_set,
      "text": 'Yaeko Light Ltd.',
      "texttwoset": 'CLI00002 - Yaeko Light',
      "expireddate": 'Exp.',
      "yeartext": '22 Years',
      "fees": 'Fees',
      "DigitdolaR": '$30',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={5}
          isDisabled={false}
      />
  },
];

export const PlanningData = [
  {
      "id": 1,
      "image": images.User_image_set,
      "text": 'abhyasamtest@gmail.com',
      "texttwoset": 'Super administrador',
      "textthree": 'Pending incidents: 2',
      "expireddate": 'Exp.',
      "yeartext": '22 Years',
      "fees": 'Fees',
      "DigitdolaR": '$30',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={5}
          isDisabled={false}
      />
  },
  {
    "id": 1,
    "image": images.User_image_set,
    "text": 'Domzoom@gmail.com',
    "texttwoset": 'Super administrador',
    "textthree": 'Pending incidents: 2',
    "expireddate": 'Exp.',
    "yeartext": '22 Years',
    "fees": 'Fees',
    "DigitdolaR": '$30',
    "Reviewstar": <Rating
        type='custom'
        ratingColor='hsl(27.7, 73.8%, 62.5%)'
        ratingBackgroundColor='#c8c7c8'
        ratingCount={5}
        tintColor={'white'}
        imageSize={17}
        startingValue={5}
        isDisabled={false}
    />
},
{
  "id": 1,
  "image": images.User_image_set,
  "text": 'Ontomedia@gmail.com',
  "texttwoset": 'Super administrador',
  "textthree": 'Pending incidents: 2',
  "expireddate": 'Exp.',
  "yeartext": '22 Years',
  "fees": 'Fees',
  "DigitdolaR": '$30',
  "Reviewstar": <Rating
      type='custom'
      ratingColor='hsl(27.7, 73.8%, 62.5%)'
      ratingBackgroundColor='#c8c7c8'
      ratingCount={5}
      tintColor={'white'}
      imageSize={17}
      startingValue={5}
      isDisabled={false}
  />
},
{
  "id": 1,
  "image": images.User_image_set,
  "text": 'Newex@gmail.com',
  "texttwoset": 'Super administrador',
  "textthree": 'Pending incidents: 2',
  "expireddate": 'Exp.',
  "yeartext": '22 Years',
  "fees": 'Fees',
  "DigitdolaR": '$30',
  "Reviewstar": <Rating
      type='custom'
      ratingColor='hsl(27.7, 73.8%, 62.5%)'
      ratingBackgroundColor='#c8c7c8'
      ratingCount={5}
      tintColor={'white'}
      imageSize={17}
      startingValue={5}
      isDisabled={false}
  />
},
{
  "id": 1,
  "image": images.User_image_set,
  "text": 'Mathtouch@gmail.com',
  "texttwoset": 'Super administrador',
  "textthree": 'Pending incidents: 2',
  "expireddate": 'Exp.',
  "yeartext": '22 Years',
  "fees": 'Fees',
  "DigitdolaR": '$30',
  "Reviewstar": <Rating
      type='custom'
      ratingColor='hsl(27.7, 73.8%, 62.5%)'
      ratingBackgroundColor='#c8c7c8'
      ratingCount={5}
      tintColor={'white'}
      imageSize={17}
      startingValue={5}
      isDisabled={false}
  />
},
{
  "id": 1,
  "image": images.User_image_set,
  "text": 'Silis@gmail.com',
  "texttwoset": 'Super administrador',
  "textthree": 'Pending incidents: 2',
  "expireddate": 'Exp.',
  "yeartext": '22 Years',
  "fees": 'Fees',
  "DigitdolaR": '$30',
  "Reviewstar": <Rating
      type='custom'
      ratingColor='hsl(27.7, 73.8%, 62.5%)'
      ratingBackgroundColor='#c8c7c8'
      ratingCount={5}
      tintColor={'white'}
      imageSize={17}
      startingValue={5}
      isDisabled={false}
  />
},
{
  "id": 1,
  "image": images.User_image_set,
  "text": 'Plussunin@gmail.com',
  "texttwoset": 'Super administrador',
  "textthree": 'Pending incidents: 2',
  "expireddate": 'Exp.',
  "yeartext": '22 Years',
  "fees": 'Fees',
  "DigitdolaR": '$30',
  "Reviewstar": <Rating
      type='custom'
      ratingColor='hsl(27.7, 73.8%, 62.5%)'
      ratingBackgroundColor='#c8c7c8'
      ratingCount={5}
      tintColor={'white'}
      imageSize={17}
      startingValue={5}
      isDisabled={false}
  />
},
  
];

export const PurchaseDta = [
  {
      "id": 1,
      "image": images.User_image_set,
      "text": 'Openlane Light Ltd.',
      "texttwoset": 'SUP0001 - Creative Programming',
      "expireddate": 'Exp.',
      "yeartext": '22 Years',
      "fees": 'Fees',
      "DigitdolaR": '$30',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={5}
          isDisabled={false}
      />
  },
  {
      "id": 2,
      "image": images.User_image_set,
      "text": 'Yearin Light Ltd.',
      "texttwoset": 'SUP0002 - Clear Light',
      "expireddate": 'Exp.',
      "yeartext": '24 Years',
      "fees": 'Fees',
      "DigitdolaR": '$34',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={4.5}
          isDisabled={false}
      />
  },
  {
      "id": 3,
      "image": images.User_image_set,
      "text": 'Goodsilron Light Ltd.',
      "texttwoset": 'SUP0003 - Clear Light',
      "expireddate": 'Exp.',
      "yeartext": '21 Years',
      "fees": 'Fees',
      "DigitdolaR": '$36',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={5}
          isDisabled={false}
      />
  },
  {
      "id": 4,
      "image": images.User_image_set,
      "text": 'Treequote Light Ltd.',
      "texttwoset": 'SUP0004 - Clear Light',
      "expireddate": 'Exp.',
      "yeartext": '22 Years',
      "fees": 'Fees',
      "DigitdolaR": '$30',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={4.5}
          isDisabled={false}
      />
  },
  {
      "id": 5,
      "image": images.User_image_set,
      "text": 'Labdrill Light Ltd.',
      "texttwoset": 'SUP0005 - Clear Light',
      "expireddate": 'Exp.',
      "yeartext": '27 Years',
      "fees": 'Fees',
      "DigitdolaR": '$40',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={5}
          isDisabled={false}
      />
  },
  {
      "id": 6,
      "image": images.User_image_set,
      "text": 'Groovestreet',
      "text": 'Bioplex Light Ltd.',
      "texttwoset": 'CLI00002 - Clear Light',
      "yeartext": '28 Years',
      "fees": 'Fees',
      "DigitdolaR": '$42',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={4.5}
          isDisabled={false}
      />
  },
  {
      "id": 7,
      "image": images.User_image_set,
      "text": 'Bioplex Inc',
      "texttwoset": 'CLI00002 - Clear Light',
      "expireddate": 'Exp.',
      "yeartext": '22 Years',
      "fees": 'Fees',
      "DigitdolaR": '$30',
      "Reviewstar": <Rating
          type='custom'
          ratingColor='hsl(27.7, 73.8%, 62.5%)'
          ratingBackgroundColor='#c8c7c8'
          ratingCount={5}
          tintColor={'white'}
          imageSize={17}
          startingValue={5}
          isDisabled={false}
      />
  },
];

export const Salesdata = [
  {
    id: 1,
    title: "PR000016",
    boxiocn: "box",
    boxicontext: "49.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 27.00",
    buttonsetdata: "Accepted"
  },
  {
    id: 2,
    title: "PR000016",
    boxiocn: "box",
    boxicontext: "49.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 27.00",
    buttonsetdata: "Accepted"
  },
  {
    id: 3,
    title: "PR000016",
    boxiocn: "box",
    boxicontext: "49.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 27.00",
    buttonsetdata: "Closed"
  },
  {
    id: 4,
    title: "PR000016",
    boxiocn: "box",
    boxicontext: "49.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 27.00",
    buttonsetdata: "Accepted"
  },
  {
    id: 5,
    title: "PR000016",
    boxiocn: "box",
    boxicontext: "49.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 27.00",
    buttonsetdata: "Closed"
  },
  {
    id: 6,
    title: "PR000016",
    boxiocn: "box",
    boxicontext: "49.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 27.00",
    buttonsetdata: "Closed"
  },
  {
    id: 7,
    title: "PR000016",
    boxiocn: "box",
    boxicontext: "49.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 27.00",
    buttonsetdata: "Accepted"
  },
  {
    id: 8,
    title: "PR000016",
    boxiocn: "box",
    boxicontext: "49.00",
    longtitle: "Oven Resistance 2000W 220 V",
    dolardprice: "$ 27.00",
    buttonsetdata: "Accepted"
  },
  
];

export const MyIncidentsData = [
  {
    id: 1, 
    date: "20/12/2021",     
    navigateScreen: (RouteName.HOME_SCREEN),
    Later: 'A',
    HeadingOne: 'Work Delivery Note',
    SubHeading: 'WDN000011' ,
    CompanyInfo: 'Altra-Dua-Ltd. Altra-Dua-Ltd it sound louder than normal',
    StatusText: 'Closed',
    RecentTime: '00:20',
    RecentText: 'Normal',       
  },
  {
    id: 2, 
    date: "21/12/2021",     
    navigateScreen: (RouteName.HOME_SCREEN),
    Later: 'A',
    HeadingOne: 'Work Delivery Note',
    SubHeading: 'WDN000011' ,
    CompanyInfo: 'Donnelly-Dua-Ltd. Donnelly-Dua-Ltd it sound louder than normal',
    StatusText: 'Closed',
    RecentTime: '00:20',
    RecentText: 'Normal',       
  },
  {
    id: 3, 
    date: "22/12/2021",     
    navigateScreen: (RouteName.HOME_SCREEN),
    Later: 'A',
    HeadingOne: 'Work Delivery Note',
    SubHeading: 'WDN000011' ,
    CompanyInfo: 'Vince-Dua-Ltd. Vince-Dua-Ltd it sound louder than normal',
    StatusText: 'Pending',
    RecentTime: '00:20',
    RecentText: 'High',       
  },
  
]

export const TechnicalAllData = [
  {
    id: 1, 
    date: "20/12/2021",     
    navigateScreen: (RouteName.HOME_SCREEN),
    Later: 'A',
    HeadingOne: 'Work Delivery Note',
    SubHeading: 'WDN000017' ,
    CompanyInfo: 'Nolan-Dua-Ltd. Nolan-Dua-Ltd it sound louder than normal',
    StatusText: 'Closed',
    RecentTime: '00:20',
    RecentText: 'Normal',       
  },
  {
    id: 2, 
    date: "21/12/2021",     
    navigateScreen: (RouteName.HOME_SCREEN),
    Later: 'A',
    HeadingOne: 'Work Delivery Note',
    SubHeading: 'WDN000015' ,
    CompanyInfo: 'Georgia-Dua-Ltd. Georgia-Dua-Ltd it sound louder than normal',
    StatusText: 'Closed',
    RecentTime: '00:20',
    RecentText: 'Normal',       
  },
  {
    id: 3, 
    date: "22/12/2021",     
    navigateScreen: (RouteName.HOME_SCREEN),
    Later: 'A',
    HeadingOne: 'Work Delivery Note',
    SubHeading: 'WDN000011' ,
    CompanyInfo: 'Hyman-Dua-Ltd. Hyman-Dua-Ltd it sound louder than normal',
    StatusText: 'Pending',
    RecentTime: '00:20',
    RecentText: 'High',       
  },
  {
    id: 4, 
    date: "22/12/2021",     
    navigateScreen: (RouteName.HOME_SCREEN),
    Later: 'A',
    HeadingOne: 'Work Delivery Note',
    SubHeading: 'WDN000023' ,
    CompanyInfo: 'Gracia -Dua-Ltd. Gracia -Dua-Ltd it sound louder than normal',
    StatusText: 'Pending',
    RecentTime: '00:20',
    RecentText: 'High',       
  },
  {
    id: 5, 
    date: "22/12/2021",     
    navigateScreen: (RouteName.HOME_SCREEN),
    Later: 'A',
    HeadingOne: 'Work Delivery Note',
    SubHeading: 'WDN000016' ,
    CompanyInfo: 'Diamond-Dua-Ltd. Diamond-Dua-Ltd it sound louder than normal',
    StatusText: 'Pending',
    RecentTime: '00:20',
    RecentText: 'High',       
  },
  
]

export const InvoiceData = [
  {
      id: '1',
      date: '25/09/2021',
      later: 'A',
      title: 'INV00001',
      SecondTtle: 'Funholding@gmail...',
      company: 'Altra-Dua-Ltd.',
      status: 'Invoice',
      time: '19:18',
      price: '$ 20.55'
  },
  {
      id: '1',
      date: '26/09/2021',
      later: 'A',
      title: 'INV00002',
      SecondTtle: 'Joh553@gmail...',
      company: 'John-Dua-Ltd.',
      status: 'Invoice',
      time: '18:18',
      price: '$ 19.55'
  },
  {
      id: '1',
      date: '27/09/2021',
      later: 'A',
      title: 'INV00001',
      SecondTtle: 'Scott142@gmail...',
      company: 'Scott-Dua-Ltd.',
      status: 'Invoice',
      time: '20:18',
      price: '$ 18.55'
  },
  {
      id: '1',
      date: '28/09/2021',
      later: 'A',
      title: 'INV00001',
      SecondTtle: 'Blake424@gmail...',
      company: 'Blake-Dua-Ltd.',
      status: 'Invoice',
      time: '17:18',
      price: '$ 22.55'
  },
  {
      id: '1',
      date: '29/09/2021',
      later: 'A',
      title: 'INV00001',
      SecondTtle: 'Jeff54554@gmail...',
      company: 'Jeff-Dua-Ltd.',
      status: 'Invoice',
      time: '24:18',
      price: '$ 21.55'
  },
];