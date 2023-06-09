import { FC } from 'react';
import {
  AutoSizerProps,
InfiniteLoaderProps,
ListProps,
WindowScrollerProps,
AutoSizer  as _AutoSizer,
InfiniteLoader as _InfiniteLoader ,
List as _List,
WindowScroller as _WindowScroller
} from "react-virtualized";
import useGrid from '../../../../../hooks/useGrid';
import Loader from '../../../../../components/common/Loader/Loader';

const AutoSizer = _AutoSizer as unknown as FC<AutoSizerProps>;
const InfiniteLoader = _InfiniteLoader as unknown as FC<InfiniteLoaderProps>;
const List = _List as unknown as FC<ListProps>;
const WindowScroller = _WindowScroller as unknown as FC<WindowScrollerProps>;

const GistsGridView = () => {
  const { rowRenderer,isRowLoaded, loadMoreRows, filteredGists, status } = useGrid();

  return (
      !filteredGists.length ? 
        <Loader />
        :
        <>
        <AutoSizer >
              {({ width }) => (
                <WindowScroller>
                  {({ height, isScrolling, onChildScroll, scrollTop }) => (
                    <InfiniteLoader
                      isRowLoaded={isRowLoaded}
                      loadMoreRows={loadMoreRows}
                      rowCount={1000}
                      minimumBatchSize={3}
                      threshold={1}
                    >
                      {({ onRowsRendered, registerChild }) => (
                        <List
                          autoHeight
                          onRowsRendered={onRowsRendered}
                          ref={registerChild}
                          height={height}
                          isScrolling={isScrolling}
                          onScroll={onChildScroll}
                          rowCount={Math.ceil(filteredGists.length/3)}
                          rowHeight={370}
                          rowRenderer={rowRenderer}
                          scrollTop={scrollTop}
                          width={width}
                        />
                      )}
                    </InfiniteLoader>
                  )}
                </WindowScroller>
              )}
            </AutoSizer>
              {status === "loading" && <Loader /> }
            </>
);
}

export default GistsGridView;