/*
* Linkstash request Lib.
* Copyright (c) 2012 - 2013 Francis Genet. All rights reserved.
*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

Rest = {
    get: function(jsonObject, strUrl, bAsync, rtrnVal) {
        Rest._request(jsonObject, strUrl, "GET", bAsync, function(data) {
            rtrnVal(data);
        });
    },

    post: function(jsonObject, strUrl, bAsync, rtrnVal) {
        Rest._request(jsonObject, strUrl, "POST", bAsync, function(data) {
            rtrnVal(data);
        });
    },

    put: function(jsonObject, strUrl, bAsync, rtrnVal) {
        Rest._request(jsonObject, strUrl, "PUT", bAsync, function(data) {
            rtrnVal(data);
        });
    },


    delete: function(jsonObject, strUrl, bAsync, rtrnVal) {
        Rest._request(jsonObject, strUrl, "DELETE", bAsync, function(data) {
            rtrnVal(data);
        });
    },

    // REST request
    _request: function(jsonObject, strUrl, reqType, bAsync, rtrnVal) {
        // The json MUST be stringify
        if(jsonObject)
            var strData = JSON.stringify(jsonObject);
        else    // If the object is empty.
            var strData = new Array();

        // Building the final url.
        var finalStrUrl = Linkstash.server_url + strUrl;
        
        $.ajax({
            url: finalStrUrl,
            type: reqType,
            dataType: "json",
            contentType: "application/json",
            async: bAsync,
            data: strData,
            success: function(data) {
                rtrnVal(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var errorObj = {
                    "request_error": {
                        "status": jqXHR.status,
                        "text": jqXHR.statusText
                    }
                };
                rtrnVal(errorObj);
            }
        });
    }
}