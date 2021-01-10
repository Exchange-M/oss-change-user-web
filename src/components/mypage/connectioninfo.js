import React, { useEffect } from 'react'

let ConnectionInfo = (props) => {
	useEffect(() => {
		// alert('hello world')
	}, [])
	return (
    <div>
      <div className="col mb-3 pb-3">
			<div className="card shadow-sm bg-white rounded h-100">
				<div className="card-header"><h5 className="pt-2 pb-1 mb-0">접속정보</h5></div>
				<div className="pl-4 pr-4 mb-3 ">
					<table className="table table-striped table-hover mb-3">
						<thead>
							<tr>
								<th scope="col" className="border-top-0 text-center">날짜</th>
								<th scope="col" className="border-top-0 text-center">상태</th>
								<th scope="col" className="border-top-0 text-center">아이피</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td> 2018-06-25 <em>13:31:30 </em></td>                         
								<td>로그인 완료 </td>                                    
								<td>175.193.165.56 </td>                                    
							</tr>
							<tr>
								<td> 2018-06-25 <em>13:31:30 </em></td>                         
								<td>로그인 완료 </td>                                    
								<td>175.193.165.56 </td>                                    
							</tr>
							<tr>
								<td> 2018-06-25 <em>13:31:30 </em></td>                         
								<td>로그인 완료 </td>                                    
								<td>175.193.165.56 </td>                                    
							</tr>
							<tr>
								<td> 2018-06-25 <em>13:31:30 </em></td>                         
								<td>로그인 완료 </td>                                    
								<td>175.193.165.56 </td>                                    
							</tr>
						</tbody>
					</table>
					<button className="btn btn-outline-info btn-block">더보기 <i className="fas fa-angle-down"></i></button>
				</div>
			</div>
		</div>
    </div>
  )
}

export default ConnectionInfo