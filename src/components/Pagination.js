import React, { PropTypes } from 'react';

import './Pagination.css';

class Pagination extends React.Component {

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <div className="text-center">
                <ul className="pagination">
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a onClick={() => this.setCurrentPage(1)}>First</a>
                    </li>

                    {pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                            <a onClick={() => this.setCurrentPage(page)}>{page}</a>
                        </li>
                    )}

                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a onClick={() => this.setCurrentPage(pager.totalPages)}>Last</a>
                    </li>
                </ul>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        // setup pages if elements array's size > 0
        if (this.props.elements && this.props.elements.length) {
            this.setCurrentPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.elements !== prevProps.elements || this.props.elements.length !== prevProps.elements.length) {
            var elementsOnPage = this.setCurrentPage(this.state.pager.currentPage);
            if (elementsOnPage && elementsOnPage.length === 0) {
                this.setCurrentPage(this.state.pager.currentPage - 1)
            }
        }
    }

    setCurrentPage(page) {
        var elements = this.props.elements;
        var pager = this.state.pager;

        if (isPageChangeValid(page, pager.totalPages)) {
            pager = this.getPager(elements.length, page);
            var pageOfElements = elements.slice(pager.startIndex, pager.endIndex + 1);
            this.setState({ pager: pager });
            this.props.onChangePage(pageOfElements);
            return pageOfElements;
        }

        return undefined;
    }

    getPager(totalElements, currentPage, pageSize) {
        currentPage = currentPage || this.props.initialPage;
        pageSize = pageSize || this.props.elementsPerPage;

        var totalPages = Math.ceil(totalElements / pageSize)
        const defaultNumberOfPages = 5;
        const roundHalvedDefaultNumberOfPages = defaultNumberOfPages / 2 >> 0;

        var startPage, endPage;
        if (totalPages <= defaultNumberOfPages) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage <= roundHalvedDefaultNumberOfPages) {
            startPage = 1;
            endPage = defaultNumberOfPages;
        } else if (currentPage + roundHalvedDefaultNumberOfPages >= totalPages) {
            startPage = totalPages - defaultNumberOfPages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - roundHalvedDefaultNumberOfPages;
            endPage = currentPage + roundHalvedDefaultNumberOfPages;
        }

        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalElements - 1);
        var pages = createArrayFromRange(startPage, endPage);

        return {
            totalElements: totalElements,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        }
    }
}

const initialPageDefault = 1;
const elementsPerPageDefault = 2;

const propTypes = {
    elements: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    elementsPerPage: PropTypes.number
}

const defaultProps = {
    initialPage: initialPageDefault,
    elementsPerPage: elementsPerPageDefault
}

function createArrayFromRange(start, end) {
    var newArray = [];
    for (var i = start; i <= end; i++) {
        newArray.push(i);
    }
    return newArray;
}

function isPageChangeValid(nextPage, numberOfPages) {
    return nextPage > 0 && !(nextPage > numberOfPages && numberOfPages > 0);
}

Pagination.prototypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;