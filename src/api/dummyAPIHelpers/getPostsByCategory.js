function getPostsByCategory({ arrayToSearch, postCategories }) {
    const filteredItemsByCategory = arrayToSearch.filter((item) => {
      return (
        item.categories.filter((cat) => postCategories.includes(cat.title))
          .length > 0
      );
    });
    return filteredItemsByCategory;
  }

  export default getPostsByCategory;