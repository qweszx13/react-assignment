import { useState, useEffect } from "react";
import styled from "styled-components";


export default function Pagination(totalItems :number, itemCountPerPage :number, pageCount :number, currentPage :number ) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  

  const StyledUl = styled.ul`
    listStyle : "none",
  `

  const StyledLi = styled.ul`
    float: left;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  ` 
  const StyledWrapperDiv = styled.div`
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
    color: "#888",
    fontSize: "14px"
  `
  const

  return (
    <StyledWrapperDiv>
      <ul style={ul}>
        <li className={`${styles.move} ${noPrev && styles.invisible}`}>
          <a href={`?page=${start - 1}`}>이전</a>
        </li>
        {[...Array(pageCount)].map((a, i) => (
          <>
            {start + i <= totalPages && (
              <li key={i}>
                <a className={`${styles.page} ${currentPage === start + i && styles.active}`}
                  href={`?page=${start + i}`}>
                  {start + i}
                </a>
              </li>
            )}
          </>
        ))}
        <li className={`${styles.move} ${noNext && styles.invisible}`}>
          <a href={`?page=${start + pageCount}`}>다음</a>
        </li>
      </ul>
    </StyledWrapperDiv>
  );
}