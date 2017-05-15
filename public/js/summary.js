const url = [location.protocol, "//", window.location.hostname, ":", window.location.port, "/slot"].join('');
const LABELS = ['_id', 'std_code', 'std_fullname', 'std_birthday', 'std_klass', 'c_code', 'c_name', 'c_group', 'c_tc', 'note', 'c_term'];
const onDelete = function(_id) {
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
const onClickRow = function(_id) {
    console.log(_id);
    var slot = rowToSlot($(`tr[data=${_id}]`));
    castToForm(slot);
}
const rowToSlot = function(row) {
    console.log(row.children().eq(0).text());
    var slot = {};
    var labels = LABELS;
    for(idx in labels) {
        slot[labels[idx]] = row.children().eq(idx).text();
    }
    return slot;
}
const slotToRow = function(slot) {
    console.log(slot._id);
    var row = $(`a[data=${slot._id}]`).parent().parent();
    var labels = LABELS;
    for(idx in labels) {
        row.children().eq(idx).text(slot[labels[idx]]);
    }
}
const castToForm = function(slot) {
    console.log(slot._id);
    var tbody = $('#slot_data');
    var labels = LABELS;
    for(idx in labels) {
        tbody.children().eq(idx*2 + 1).children().children().val(slot[labels[idx]]);
    }
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
                console.log(res);
                if( res.ok) {
                    var _id;
                    if( res.upserted ) {
                        console.log("upserted");
                        _id = res.upserted[0]._id;
                        $('#list_body').append(`<tr class='row' data='${_id}' onclick='onClickRow("${_id}")'>
                            <td>${slot._id}</td>
                            <td>${slot.std_code}</td>
                            <td>${slot.std_fullname}</td>
                            <td>${slot.std_birthday}</td>
                            <td>${slot.std_klass} </td>
                            <td>${slot.c_code}</td>
                            <td>${slot.c_name}</td>
                            <td>${slot.c_group}</td>
                            <td>${slot.c_tc}</td>
                            <td>${slot.note}</td>
                            <td>${slot.c_term}</td>
                            <td>
                                <a href="#" class="delete" data='${_id}' onclick='onDelete("${_id}")'>delete</a>
                            </td>
                        </tr>`);
                    }
                    else if( res.nModified ){
                        console.log("nModified");
                        slotToRow(slot);
                    }

                }
            });
    });
    $('.delete').on('click', function() {
        onDelete($(this).attr('data'));
    });
    $('.row').on('click', function() {
        onClickRow($(this).attr('data'));
    })
});
