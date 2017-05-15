var url = [location.protocol, "//", window.location.hostname, ":", window.location.port, "/slot"].join('');
var onDelete = function(_id) {
    var self = $(`a[data=${_id}]`);
    fetch( url,
        {
            method: 'delete',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: _id}),
        })
        .then(res => res.json())
        .then(res => {
            if( res.ok ) {
                self.parent().parent().remove();
            }
        });
}
$(document).ready(() => {
    $('#save').on('click', () => {
        var slot = $('#slot_form').serializeArray().reduce((slot, obj) => { slot[obj.name] = obj.value; return slot; },{})
        console.log(url);
        fetch( url,
            {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(slot),
            })
            .then(res=>res.json())
            .then(res => {
                if( res.ok) {
                    var _id = res.upserted ? res.upserted[0]._id : slot._id;

                    $('#list_body').append(`<tr>
                        <td>${slot.std_code}</td>
                        <td>${slot.std_fullname}</td>
                        <td>${slot.std_birthday}</td>
                        <td>${slot.std_klass} </td>
                        <td>${slot.c_code}</td>
                        <td>${slot.c_name}</td>
                        <td>${slot.c_group}</td>
                        <td>${slot.c_tc}</td>
                        <td>${slot.note}</td>
                        <td>
                            <a href="#" class="delete" data='${_id}' onclick='onDelete("${_id}")'>delete</a>
                        </td>
                    </tr>`);
                }
            });
    });
    $('.delete').on('click', function() {
        onDelete($(this).attr('data'));
    });
});
