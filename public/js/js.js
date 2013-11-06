renderPage = function(json) {
  var counter = 0;
  $.each(json.oven, function() {
    var cookie = new Cookie(this.cookie_type, parseInt(this.bakeTime), parseInt(this.timeCooked));
    oven.racks.push(cookie);
    $('#rack_'+counter).text(cookie.type + " " + cookie.status()).addClass(cookie.status());
    counter++;
    console.log(cookie);
  });
  $.each(json.table, function() {
    var cookie = new Cookie(this.cookie_type, parseInt(this.bakeTime), parseInt(this.timeCooked));
    table.queue.push(cookie);
    var node = "<li>"+cookie.type+"<button class='add_to_oven'>Add to oven</button></li>";
    $('#prep_batches').append(node);
  });
};

makeJson = function() {
  ovenArray = [];
  $.each(oven.racks, function(){
    var type = this.type;
    var timeCooked = this.timeCooked;
    var bakeTime = this.bakeTime;
    ovenArray.push({'type': type, 'timeCooked': timeCooked, 'bakeTime': bakeTime});
  });
  tableArray = [];
  $.each(table.queue, function(){
    var type = this.type;
    var timeCooked = this.timeCooked;
    var bakeTime = this.bakeTime;
    tableArray.push({'type': type, 'timeCooked': timeCooked, 'bakeTime': bakeTime});
  });
  jsonHash = {'oven': ovenArray, 'prepTable': tableArray};
  return jsonHash;
};


function Cookie(type, bakeTime, timeCooked) {
  this.type = type;
  this.bakeTime = bakeTime;
  this.timeCooked = timeCooked || 0;
}

Cookie.prototype.status = function() {
  if (this.timeCooked === 0) {
    return 'raw';
  }
  else if (this.timeCooked < this.bakeTime) {
    return 'still_gooey';
  }
  else if (this.timeCooked == this.bakeTime) {
    return 'just_right';
  }
  else if (this.timeCooked > this.bakeTime) {
    return 'crispy';
  }
};

function Oven() {
  this.racks = [];

  this.addCookie = function(cookie) {
    if (this.racks.length < 3) {
      this.racks.push(cookie);
    }
  };

  this.bake = function() {
    $.each(this.racks, function(key, value) {
      value.timeCooked+= 1;
    });
  };
}

Oven.prototype.hasRoom = function() {
  if (this.racks.length < 3) {
    return true;
  }
};

function prepTable() {
  this.queue = [];
  this.addCookie = function(cookie) {
    this.queue.push(cookie);
  };
  this.removeCookie = function(cookieIndex) {
    this.queue.splice(cookieIndex, 1);
  };
}

function updateStatuses() {
  for (var i=0; i<=oven.racks.length-1; i++) {
    cookie = oven.racks[i];
    $('td#rack_'+i).text(cookie.type + " " + cookie.status()).removeClass().addClass(cookie.status());
  }
}

function bakeIfRoom(object, cookie, index) {
  if (oven.hasRoom()) {
    $(object).parent().remove();
    $('td#rack_'+oven.racks.length).text(cookie.type + " " + cookie.status()).addClass(cookie.status());
    table.removeCookie(index);
    oven.addCookie(cookie);
    alert(cookie.type + " Has been added to the oven");
  }
  else {
    alert("sorry brah");
  }
}

var oven = new Oven();
var table = new prepTable();

$(document).ready(function() {
   // starting_json_block = ajax request to get starting_json_block
   $.get('/getjson', function(response) {
     renderPage(response);
   }, 'json');

  $('#new_batch').on('submit', function(event) {
    event.preventDefault();
    var batch_type = $('input[name="batch_type"]').val();
    var bake_time = $('input[name="bake_time"]').val();
    var newCookie = new Cookie(batch_type, bake_time);
    var node = "<li>"+batch_type+"<button class='add_to_oven'>Add to oven</button></li>";
    $('#prep_batches').append(node);
    table.addCookie(newCookie);
  });

  $('#prep_batches').on('click', '.add_to_oven', function(event) {
      var index = $(this).parent().index();
      var cookie = table.queue[index];
      bakeIfRoom($(this), cookie, index);
    });

  $('#bake').on('click', function() {
    oven.bake();
    updateStatuses();
  });

  $("#save_button").on('submit', function(event){
    event.preventDefault();
    var data = makeJson();
    $.post('/save', data, function(response) {
      console.log(response);
    }, 'json');
  });
});
