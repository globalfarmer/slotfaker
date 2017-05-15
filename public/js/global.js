const url = [location.protocol, "//", window.location.hostname, ":", window.location.port, "/"].join('');
$(document).ready(() => {
    $('#SinhvienLmh_term_id').on('change', function() {
        var val = $(this).val();
        if(  val === '022' || val == '021' ) {
            fetch( url,
                {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'SinhvienLmh[term_id]': val}),
                })
                .then(res => res.json())
                .then(results => {
                    $('.summary').eq(0).text(`Kết quả từ 1 tới ${results.length} trên ${results.length}.  `);
                    var list = $("#slot_tbody");
                    list.html('');
                    results.forEach((slot, idx) => {
                        if( slot.student === undefined ) slot.student = {};
                        if( slot.course === undefined ) slot.course = {};
                        list.append(`<tr class="odd">
                        	<td style="width: 20px">${idx}</td>
                        	<td style="width: 40px">${slot.student.code}</td>
                        	<td style="width: 100px">${slot.student.fullname}</td>
                        	<td style="width: 60px">${slot.student.birthday}</td>
                        	<td style="width: 100px">${slot.student.klass}</td>
                        	<td style="width: 50px">${slot.course.code}</td>
                        	<td style="width: 160px">${slot.course.name}</td>
                        	<td style="width: 15px">${slot.course.group}</td>
                        	<td style="width: 15px">${slot.course.tc}</td>
                        	<td style="width: 60px">${slot.note}</td>
                        	<td style="width: 140px; display:none">${val}</td>
                        </tr>`);
                    });
                });
        }
    });
});
