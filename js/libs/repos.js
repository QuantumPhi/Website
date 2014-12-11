define(['jquery'], function($) {
    return $.ajax({
        url: 'https://api.github.com/users/QuantumPhi/repos?type=all&per_page=100',
        cache: true,
        async: false,
        success: function(data) { return data }
    })
})
