import { useEffect, useState } from "react";

export default function usePagination(data: Array<any>) {
    const [pages, setPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentPageSet, setCurrentPageSet] = useState<number>(1);
    const [pagesToShow, setPagesToShow] = useState<Array<number>>([]);
    const [paginatedData, setPaginatedData] = useState<Array<any>>([]);
    const dataPerPage = 10;
    const pagePerSet = 5;
    const isLastSet = currentPageSet * pagePerSet >= pages;

    const resetPagination = () => {
        setCurrentPage(1);
        setCurrentPageSet(1);
    }
    useEffect(() => {
        setPages(Math.ceil(data.length / dataPerPage));
        resetPagination();
    }, [data])

    const paginateData = () => {
        const currentIndex = (currentPage - 1) * dataPerPage;
        const slicedData = data.slice(currentIndex, currentIndex + dataPerPage);
        setPaginatedData(slicedData);
    }

    useEffect(() => {
        paginateData();
        if (currentPage > currentPageSet * pagePerSet)
            setCurrentPageSet(currentPageSet + 1)
        else if (currentPage <= (currentPageSet - 1) * pagePerSet)
            setCurrentPageSet(currentPageSet - 1)
    }, [data, currentPage])

    useEffect(() => {
        const newPagesToShow = [];
        const lastPageToShow = currentPageSet * pagePerSet;
        const firstPageToShow = lastPageToShow - pagePerSet;
        for (let pageToShow = firstPageToShow + 1; pageToShow <= lastPageToShow; pageToShow++) {
            if (pageToShow <= pages) newPagesToShow.push(pageToShow)
            else break;
        }
        setPagesToShow(newPagesToShow);
    }, [data, currentPageSet])

    const next = () => {
        if (currentPage < pages) setCurrentPage(currentPage + 1)
    }

    const previous = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const jumpToPage = (page: number) => {
        setCurrentPage(page);
    }

    const nextSet = () => {
        if (!isLastSet) {
            const nextSet = currentPageSet + 1;
            setCurrentPage((nextSet * pagePerSet) - pagePerSet + 1)
            setCurrentPageSet(nextSet);
        }
    }

    return {
        next,
        previous,
        jumpToPage,
        nextSet,
        pages,
        paginatedData,
        currentPage,
        pagesToShow,
        isLastSet
    }
}