var token = '90931452|-31949325304338032|90949639';
var dbname = 'COLLEGE-DB';
var relation = 'PROJECT-TABLE';
var baseUrl = 'http://api.login2explore.com:5577';

function resetForm() {
  $('#projectID').val('');
  $('#projectName').val('');
  $('#assignedTo').val('');
  $('#assignmentDate').val('');
  $('#deadline').val('');
}

function disableAll() {
  resetForm();
  $('#projectID').prop('disabled', false);
  $('#projectID').focus();
  $('#projectName').prop('disabled', true);
  $('#assignedTo').prop('disabled', true);
  $('#assignmentDate').prop('disabled', true);
  $('#deadline').prop('disabled', true);
  $('#saveButton').prop('disabled', true);
  $('#updateButton').prop('disabled', true);
  $('#resetButton').prop('disabled', true);
}

disableAll();

function executeCommand(reqString, apiEndPointUrl) {
  var url = baseUrl + apiEndPointUrl;
  var jsonObj;

  $.ajax({
    url: url,
    type: 'POST',
    data: reqString,
    async: false,
    success: function(result) {
      jsonObj = JSON.parse(result);
    },
    error: function(result) {
      var dataJsonObj = result.responseText;
      jsonObj = JSON.parse(dataJsonObj);
    }
  });

  return jsonObj;
}

function createGET_BY_KEYRequest(token, dbname, relationName, jsonObjStr, createTime, updateTime) {
  if (createTime !== undefined) {
    if (createTime !== true) {
      createTime = false;
    }
  } else {
    createTime = false;
  }
  if (updateTime !== undefined) {
    if (updateTime !== true) {
      updateTime = false;
    }
  } else {
    updateTime = false;
  }
  var value1 = `{
    "token" : "${token}",
    "cmd" : "GET_BY_KEY",
    "dbName": "${dbname}",
    "rel" : "${relationName}",
    "jsonStr": ${jsonObjStr},
    "createTime": ${createTime},
    "updateTime": ${updateTime}
  }`;

  return value1;
}

function findProject(ele) {
  var projectID = $(ele).val();
  var obj = {
    Project_ID: projectID
  };
  var jsonobj = JSON.stringify(obj);
  var request = createGET_BY_KEYRequest(token, dbname, relation, jsonobj);
  var res = executeCommand(request, '/api/irl');
  if (res.status == 400) {
    enableFields();
  } else {
    disableFields();
    var data = JSON.parse(res.data).record;
    $('#projectName').val(data.Project_Name);
    $('#assignedTo').val(data.Assigned_To);
    $('#assignmentDate').val(data.Assignment_Date);
    $('#deadline').val(data.Deadline);
  }
}

function createPUTRequest(connToken, jsonObj, dbName, relName) {
  var putRequest = `{
    "token" : "${connToken}",
    "dbName": "${dbName}",
    "cmd" : "PUT",
    "rel" : "${relName}",
    "jsonStr": ${jsonObj}
  }`;
  return putRequest;
}

function saveData() {
  var projectID = $('#projectID').val();
  var projectName = $('#projectName').val();
  var assignedTo = $('#assignedTo').val();
  var assignmentDate = $('#assignmentDate').val();
  var deadline = $('#deadline').val();

  if (projectID == '') {
    $('#projectID').focus();
    return;
  }
  if (projectName == '') {
    $('#projectName').focus();
    return;
  }
  if (assignedTo == '') {
    $('#assignedTo').focus();
    return;
  }
  if (assignmentDate == '') {
    $('#assignmentDate').focus();
    return;
  }
  if (deadline == '') {
    $('#deadline').focus();
    return;
  }

  var obj = {
    Project_ID: projectID,
    Project_Name: projectName,
    Assigned_To: assignedTo,
    Assignment_Date: assignmentDate,
    Deadline: deadline
  };
  var jsonobj = JSON.stringify(obj);
  var req = createPUTRequest(token, jsonobj, dbname, relation);
  var res = executeCommand(req, '/api/iml');
  disableAll();
}

function updateData() {
  var projectID = $('#projectID').val();
  var projectName = $('#projectName').val();
  var assignedTo = $('#assignedTo').val();
  var assignmentDate = $('#assignmentDate').val();
  var deadline = $('#deadline').val();

  if (projectName == '') {
    $('#projectName').focus();
    return;
  }
  if (assignedTo == '') {
    $('#assignedTo').focus();
    return;
  }
  if (assignmentDate == '') {
    $('#assignmentDate').focus();
    return;
  }
  if (deadline == '') {
    $('#deadline').focus();
    return;
  }

  var obj = {
    Project_ID: projectID,
    Project_Name: projectName,
    Assigned_To: assignedTo,
    Assignment_Date: assignmentDate,
    Deadline: deadline
  };
  var jsonobj = JSON.stringify(obj);
  var req = createPUTRequest(token, jsonobj, dbname, relation);
  var res = executeCommand(req, '/api/iml');
  disableAll();
}

function enableFields() {
  $('#projectName').prop('disabled', false);
  $('#assignedTo').prop('disabled', false);
  $('#assignmentDate').prop('disabled', false);
  $('#deadline').prop('disabled', false);
  $('#saveButton').prop('disabled', false);
  $('#resetButton').prop('disabled', false);
}

function disableFields() {
  $('#projectName').prop('disabled', true);
  $('#assignedTo').prop('disabled', true);
  $('#assignmentDate').prop('disabled', true);
  $('#deadline').prop('disabled', true);
  $('#updateButton').prop('disabled', false);
}
