import authService from './auth'
export const register = async (formData) => {
          return await fetch(`/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
      };
 export const createPost = async (postData) => {
        return await fetch(`/api/createpost`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
          authorization: `Bearer ${authService.getToken()}`},
          body: JSON.stringify(postData)
      });
    };
export const getSingle = async () => {
         return fetch(`/api/me`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
          authorization: `Bearer ${authService.getToken()}`,
        },
      });
  }
  export const getRole = async () => {
          return fetch(`/api/getrole`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json',
          authorization: `Bearer ${authService.getToken()}`,
        },
      });
  }

export const login = async (formData) => {
        return await fetch(`/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  };

export const getPostData = async () => {
  return await fetch(`/api/getposts`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
  },
});
}
export const addPost = async (name) => {
  return await fetch(`/api/createcategory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    authorization: `Bearer ${authService.getToken()}`},
    body: JSON.stringify(name)
})
}
export const getCategories = async () => {
  return await fetch(`/api/getcategories`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
  },
})
}
export const getbyCategory = async (category) => {
  return await fetch(`/api/getbycategory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
  },
  body: JSON.stringify({category})
})
}
export const getIndividual = async (id) => {
  return await fetch(`/api/single/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
  },
});
}
export const addReview = async (id, comment, rating, header) => {
  return await fetch(`/api/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      authorization: `Bearer ${authService.getToken()}`,
    },
    body: JSON.stringify({comment, item_id: id, rating, header})
  });
}
export const getBestSellers = async () => {
  try {
    const response = await fetch('/api/bestsellers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getFeaturedItems = async () => {
  try {
    const response = await fetch('/api/featured', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getHotTrendingItems = async () => {
  try {
    const response = await fetch('/api/hottrending', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getAllAnalytics = async () => {
  try {
    const response = await fetch('/api/allanalytics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
