import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

export const Pagination = ({ forksPerPage, totalForks, paginate, prevPage, nextPage }) => {
	const pageNumber = [];
	// const storedResult = useSelector((state) => state.result.result);

	for (let i = 1; i <= Math.ceil(totalForks / forksPerPage); i++) {
		pageNumber.push(i);
	}

	if (pageNumber.length > 0)
		return (
			<ul className="pagination">
				<li className="pagination__item" key="prev">
					<button className="pagination__button" onClick={prevPage}>
						<svg width="11" height="23" viewBox="0 0 11 23" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.5627 0.00170898C10.6492 0.00172745 10.7338 0.0273968 10.8057 0.0754735C10.8776 0.12355 10.9337 0.19187 10.9668 0.271799C10.9998 0.351728 11.0085 0.439674 10.9916 0.524512C10.9747 0.609349 10.933 0.687264 10.8718 0.748412L1.08789 10.5335C0.950647 10.6716 0.873607 10.8584 0.873607 11.0531C0.873607 11.2478 0.950647 11.4346 1.08789 11.5727L10.8718 21.3572C10.9515 21.4396 10.9956 21.5501 10.9946 21.6648C10.9936 21.7795 10.9476 21.8892 10.8665 21.9703C10.7854 22.0513 10.6757 22.0973 10.561 22.0983C10.4464 22.0993 10.3359 22.0553 10.2534 21.9756L0.470633 12.1911C0.169251 11.889 0 11.4797 0 11.0529C0 10.6262 0.169251 10.2169 0.470633 9.91479L10.2545 0.13C10.3363 0.0481709 10.4471 0.00204254 10.5627 0.00170898Z"
								fill="#363636"
							/>
						</svg>
					</button>
				</li>

				{pageNumber.map((item) => (
					<li className="pagination__item" key={item}>
						<button className="pagination__button" onClick={() => paginate(item)}>
							{item}
						</button>
					</li>
				))}

				<li className="pagination__item" key="next">
					<button className="pagination__button" onClick={nextPage}>
						<svg width="11" height="23" viewBox="0 0 11 23" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M0.437263 0C0.350759 1.84687e-05 0.266191 0.0256917 0.194276 0.0737757C0.122361 0.12186 0.0663223 0.19019 0.0332403 0.270131C0.000157356 0.350072 -0.00846863 0.438032 0.00843239 0.522882C0.0253334 0.607732 0.0670118 0.685659 0.1282 0.746817L9.91211 10.5334C10.0494 10.6715 10.1264 10.8583 10.1264 11.0531C10.1264 11.2478 10.0494 11.4346 9.91211 11.5727L0.1282 21.3587C0.0485315 21.4412 0.00444603 21.5517 0.00544262 21.6664C0.00643921 21.7811 0.0524311 21.8908 0.13352 21.9719C0.214609 22.053 0.324298 22.099 0.438972 22.1C0.553644 22.101 0.664125 22.0569 0.746611 21.9772L10.5294 12.1912C10.8307 11.8891 11 11.4797 11 11.0529C11 10.6261 10.8307 10.2167 10.5294 9.91459L0.745455 0.128311C0.663728 0.046469 0.552915 0.000333603 0.437263 0Z"
								fill="#363636"
							/>
						</svg>
					</button>
				</li>
			</ul>
		);
	return null;
};

export default Pagination;
