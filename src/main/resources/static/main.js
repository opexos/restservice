htmlPreviewImages = function (idList) {
    let html = "";
    $.each(idList, function (i) {
        html = html + `<a href='/image/${idList[i]}' target="_blank"><img src='/image/${idList[i]}?preview=true'/></a>`;
    });
    return html;
};

uploadImages = function (data, output, img, btn, indicator) {
    let params = {
        url: "/image",
        type: "POST",
        data: data,
        success: function (result) {
            $(img).html(htmlPreviewImages(result.idList));
            $(output).html(JSON.stringify(result));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(img).html('ERROR');
            $(output).html(xhr.responseText);
        },
        beforeSend: function() {
            $(btn).prop('disabled', true);
            $(indicator).show();
        },
        complete: function () {
            $(btn).prop('disabled', false);
            $(indicator).hide();
        }
    };

    if (data instanceof FormData) {
        params.processData = false;  // tell jQuery not to process the data
        params.contentType = false;   // tell jQuery not to set contentType
    } else {
        params.dataType = "json";
        params.contentType = "application/json";
    }

    $.ajax(params);
};