ZOHO.CREATOR.init().then(function (data) {
  var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
  console.log("queryParams:", queryParams);
  var initparams = ZOHO.CREATOR.UTIL.getInitParams();
  console.log("initparams:", initparams);
  console.log("loginUser:", initparams.loginUser);

  function submitData() {
    var appName = document.getElementById("appName").value;
    var formName = document.getElementById("formName").value;
    var jsonDataText = document.getElementById("jsonData").value;
    console.log("jsonDataText", jsonDataText);

    try {
      var jsonData = JSON.parse(jsonDataText); // Parse the input JSON data
      console.log("jsonData", jsonData);

      jsonData.forEach((record) => {
        if (record.hasOwnProperty("data")) {
          // Chuẩn bị formData chỉ khi record có key 'data'
          const formData = { data: {} };

          // Lặp qua từng key trong đối tượng data của record
          for (const key in record.data) {
            if (record.data.hasOwnProperty(key)) {
              // Thêm key và giá trị tương ứng vào formData
              formData.data[key] = record.data[key];
            }
          }

          console.log("formData", formData);

          var config = {
            appName: appName,
            formName: formName,
            data: formData.data, // Sử dụng trực tiếp dữ liệu trong formData
          };

          console.log("config===>", config);

          // Gọi API ZOHO Creator để thêm record
          ZOHO.CREATOR.API.addRecord(config)
            .then(function (response) {
              if (response.code == 3000) {
                console.log("Record added successfully");
              } else {
                console.error("Error adding record:", response);
              }
            })
            .catch(function (error) {
              console.error("API call failed:", error);
            });
        } else {
          console.error(
            "Record does not contain 'data' key:",
            record
          );
        }
      });
    } catch (e) {
      console.error("Invalid JSON data", e);
      alert("Please enter valid JSON data.");
    }
  }
});
