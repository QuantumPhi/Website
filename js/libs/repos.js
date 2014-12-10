define(['jquery'], function() {
    return $.getJSON('//api.github.com/users/QuantumPhi/repos?type=all',
            function(data) {
        return data
    })
})
