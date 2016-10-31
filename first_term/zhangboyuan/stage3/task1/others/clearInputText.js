// Created by Boyuan on 2016.7.30

function clearInputText(oinput) {

    for (var i = 0; i < oinput.length; i++) {
        inputTextChange(oinput[i], oinput[i].value);
    }

    function inputTextChange(oinput, str) {
        oinput.onfocus = (function () {
            if (this.value == str) {
                this.value = '';
            }
        });
        oinput.onblur = (function () {
            if (this.value == '') {
                this.value = str;
            }
        });
    }
}