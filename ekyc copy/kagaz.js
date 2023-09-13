var request = require("request");
const UserServices = require("./service");
const kagaz = require("./kagaz");


exports.verify = async (options) => {
  var options = options;
  request(options, function (error, response) {
    if (error) throw new Error(error);
    
    
    const data = {
      "mobile": JSON.parse(response.body).result.mobile == null ? "null" : JSON.parse(response.body).result.mobile ,
      "gender":  JSON.parse(response.body).result.gender  == null ? "null" : JSON.parse(response.body).result.gender,
      "state": JSON.parse(response.body).result.state  == null ? "null" : JSON.parse(response.body).result.state,
      "ageBand": JSON.parse(response.body).result.ageBand  == null ? "null" : JSON.parse(response.body).result.ageBand,
      "isIssued": "Y",
      "caseId": JSON.parse(response.body).clientData.caseId
    };

    //console.log(JSON.parse(response.body).clientData.caseId);
    console.log(data);

    UserServices.registerUser(data);
  });
  
};

exports.consent = async (name, caseId, aadhaar) => {

  const currentEpochTimeSeconds = Math.floor(Date.now() / 1000);
  
  var options1 = {
    method: "POST",
    url: "https://testapi.karza.in/v3/aadhaar-consent",
    headers: {
      "x-karza-key": "1noblAZ0o8J6NJsj",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lat: "19",
      long: "82",
      userAgent: "Mozilla",
      deviceId: "xxxx-optional",
      deviceInfo: "1234-optional",
      browserInfo: "Browser Data",
      consent: "Y",
      name: name,
      consentTime: currentEpochTimeSeconds,
      consentText: "I authorize Karza Technologies Private Limited to access my Aadhaar number and help me fetch my details. I understand that Karza will not be storing or sharing the same in any manner. ",
      clientData: {
        caseId: caseId,
      },
    }),
  };


  request(options1, function (error, response) {
    if (error) throw new Error(error);

    var options2 = {
      method: "POST",
      url: "https://testapi.karza.in/v2/aadhaar-verification",
      headers: {
        "x-karza-key": "1noblAZ0o8J6NJsj",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aadhaarNo: ""+aadhaar,
        consent: "Y",
        checkValidation: true,
        accessKey: JSON.parse(response.body).result.accessKey,
        clientData: {
          caseId: ""+caseId,
        },
      }),
    };
    console.log(options2);
    kagaz.verify(options2)
  });
  //return "qwrty";
};


