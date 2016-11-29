/**
 * Created by bump94 on 17.11.2016.
 */


var SDK = {

    serverURL: "http://localhost:5050/api",

    request: function (options, cb) {

        //Perform XHR
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: function (data, status, xhr) {
                cb(null, data, status, xhr);
            },
            error: function (xhr, status, errorThrown) {
                cb({xhr: xhr, status: status, error: errorThrown});
            }

        });
    },


    login: function (cbsMail, password, cb) {
        this.request({
            data: {
                cbsMail: cbsMail,
                password: password


            },
            url: "/login",
            method: "POST"
        },  function (err, data) {

            //On login-error
            if (err) return cb(err);
            SDK.Storage.persist("tokenId", data.id);
            SDK.Storage.persist("tokenUserType", data.type);
            cb(null, data);

        });
    },

    Storage: {
        prefix: "storeSDK",
        persist: function (key, value) {
            window.localStorage.setItem(this.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: function (key) {
            var val = window.localStorage.getItem(this.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e){
                return val;
            }
        },
        remove:function (key) {
            window.localStorage.removeItem(this.prefix + key);
        }
    },

    User: {
        getAll: function (cb) {
            SDK.request({method: "GET", url: "/login"}, cb);
        },
        current:function () {
            return SDK.Storage.load("user");
        }
    },

    logOut:function() {
        SDK.Storage.remove("cbsMail");
        SDK.Storage.remove("tokenId");
        SDK.Storage.remove("tokenUserType");
    },


    /*
     //veldig usikker på hvordan jeg skal løse denne???
     Lectures:{
     getLectures: function(cb){
     SDK.request({
     method: "GET",
     url:"lecture/" + SDK.Storage.load("tokenId")},
     cb);
     }
     },
     */
};


function encryptDecrypt(input) {
    var key = ['A', 'B', 'C'];
    var out = "";
    for (var i = 0; i < input.length; i++) {
        out += (String.fromCharCode(((input.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0))));
    }
    return out;
}
