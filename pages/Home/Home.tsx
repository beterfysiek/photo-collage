import React, {useEffect, useState, useCallback} from 'react';
import {Modal, Dimensions, SafeAreaView, StatusBar} from 'react-native';
import Constants from '../../services/constants/constants';
import styles from './Home.style';
import HPhoto from './HPhoto/HPhoto';
import MasonryList from '@appandflow/masonry-list';
import Detail from '../Detail/Detail';
import GestureRecognizer from 'react-native-swipe-gestures';
import FastImage from 'react-native-fast-image';

const api: string = 'https://api.unsplash.com/photos/';
const per_page: string = 'per_page=15';
// TODO: should be on a safe place
const client_id: string =
  'client_id=iGi9POelZ8uX08gPkkdeo-hI5NGU2swR3JfYaQGEKZ4';
let fetchedPages: number[] = [];

export default function Home() {
  const [list, setList] = useState<any[]>([]);
  const [disabledPaging, setDisabledPaging] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [rownumb, setRownumb] = useState<number>(
    Constants.isPortrait() ? 2 : 4,
  );
  const [disableSwipe, setDisableSwipe] = useState<boolean>(false);

  const showDetails = (item: any) => {
    if (!item) {
      return;
    }
    setActiveItem(item);
    setShowModal(true);
  };

  const getPhotos = useCallback(async (_page: number) => {
    if (fetchedPages.indexOf(_page) > -1) {
      // return if page is already fetched
      return;
    }
    // store into fetchedPages
    fetchedPages.push(_page);
    // create url with next page number
    const url = `${api}?${client_id}&${per_page}&page=${_page}`;

    const data: any = await fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }).then((res) => res.json());

    if (data && Array.isArray(data)) {
      // preload bigger images for fullscreen
      const preloadImages = [...data].map((d) => ({
        uri: d.urls.regular,
      }));
      FastImage.preload(preloadImages);

      // merge arrays
      setList((prev) => [...prev, ...data]);
      // only increment page if data actualy returns
      // TODO: remove page from fetched pages if fetch faillls
      setPage(_page);
    } else {
      // TODO: error handling
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPhotos(0);
    // use as init so no need for params

    Dimensions.addEventListener('change', () => {
      // change rows from 2 to 4
      // TODO: recalculate the photos
      const rn = Constants.isPortrait() ? 2 : 4;
      setRownumb(rn);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (!disabledPaging) {
      // kinda hacky but the wait prevents double incrment bug from MasonryList lib (because there are two flatlist under the hood)
      // TODO: fix the flatlist inside scrolview situation inside the MasonryList library
      setDisabledPaging(true);
      setTimeout(() => {
        setDisabledPaging(false);
      }, 300);

      // load more photos
      getPhotos(page + 1);
    }
  };

  const swipeLeft = () => {
    // prevent swiping while animation is going
    // TODO: make the disable time more accurate with the loading of both images inside HPhotos
    if (!activeItem || disableSwipe) {
      return;
    }

    // grab id from list and return the index of the id inside the list
    const activeIndex = list
      .map((item: any, index: number) => ({id: item.id, index: index}))
      .filter((item: any) => item.id === activeItem.id);
    const aIndex =
      activeIndex && activeIndex.length ? activeIndex[0].index : null;

    if (aIndex && list[aIndex] && list[aIndex + 1]) {
      setActiveItem(list[aIndex + 1]);
    } else {
      // if not possible to find the key then close modal
      setShowModal(false);
    }
  };

  const swipeRight = () => {
    // prevent swiping while animation is going
    // TODO: make the disable time more accurate with the loading of both images inside HPhotos
    // TODO: this code looks a lot like the swipeLeft, could make it one function or depending on one helper function
    if (!activeItem || disableSwipe) {
      return;
    }

    // grab id from list and return the index of the id inside the list
    const activeIndex: any[] | [] = list
      .map((item: any, index: number) => ({id: item.id, index: index}))
      .filter((item: any) => item.id === activeItem.id);

    const aIndex: number | null =
      activeIndex && activeIndex.length ? activeIndex[0].index : null;

    if (aIndex && list[aIndex] && list[aIndex - 1]) {
      setActiveItem(list[aIndex - 1]);
    } else {
      // if not possible to find the key then close modal
      setShowModal(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <MasonryList
        numColumns={rownumb}
        extraData={list}
        data={list}
        renderItem={({
          item,
          index,
          column,
        }: {
          item: any;
          index: number;
          column: number;
        }) => (
          <HPhoto
            key={String(index) + String(column)}
            item={item}
            column={column}
            setShowDetails={showDetails}
          />
        )}
        keyExtractor={(item: any, index: number) => index + ''}
        initialNumToRender={5}
        getHeightForItem={({item}: {item: any}) => {
          const padding: number = Constants.dist.s * 3;
          const width: number = Constants.screen.width / 2 - padding;
          const ratio: number = item.height / item.width;
          const height: number = ratio * width;
          return height + Constants.dist.l;
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.8}
      />
      <GestureRecognizer
        onSwipeLeft={swipeLeft}
        onSwipeRight={swipeRight}
        onSwipeUp={() => setShowModal(false)}
        config={{
          velocityThreshold: 0.2,
          directionalOffsetThreshold: 70,
        }}
        style={styles.gesture}>
        <Modal
          visible={showModal}
          animationType="fade"
          transparent
          supportedOrientations={['portrait', 'landscape']}>
          <Detail
            close={() => setShowModal(false)}
            item={activeItem}
            setDisableSwipe={setDisableSwipe}
          />
        </Modal>
      </GestureRecognizer>
    </SafeAreaView>
  );
}
