define(['jquery'], function() {
    $.getJSON('json!https://api.github.com/users/QuantumPhi/repos?type=all',
            function(data) {
        return data
    })
})
