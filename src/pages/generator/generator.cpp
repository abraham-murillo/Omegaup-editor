#include <bits/stdc++.h>
using namespace std;

struct Random {
  mt19937 rng;

  Random() : rng(chrono::steady_clock::now().time_since_epoch().count()) {}

  // Fills a vector of type T using a generator v create a single element.
  template <class T, class Generator>
  vector<T> fillArray(int n, bool unique, Generator g) {
    assert(n >= 0);
    vector<T> v(n);
    if (unique) {
      set<T> st;
      for (auto& x : v) {
        do {
          x = g();
        } while (st.count(x));
        st.insert(x);
      }
    } else {
      for (auto& x : v)
        x = g();
    }
    return v;
  }

  // Returns a random value, the default type is of the largest.
  template <class T, class Z = T>
  Z get(T low, Z high) {
    assert(low <= high);
    if constexpr (is_integral_v<Z>) {
      return uniform_int_distribution<Z>(low, high)(rng);
    } else if (is_floating_point_v<Z>) {
      return uniform_real_distribution<Z>(low, high)(rng);
    }
  }

  // Returns a vector of size n, with all elements in the range [low, high].
  template <class T>
  vector<T> getArray(int n, T low, T high, bool unique = false) {
    static constexpr T EPS = is_integral_v<T> ? 1 : 1e-9;

    if (unique)
      if constexpr (is_integral_v<T>) {
        assert(high - low + EPS >= n);
      }

    double batchSize = (high - low + EPS) / double(n);
    T batchLow = low, batchHigh = low + batchSize - EPS;
    return fillArray<T>(n, false, [&]() {
      if (unique) {
        T value = get<T>(batchLow, batchHigh);
        batchLow += batchSize;
        batchHigh += batchSize;
        if (batchHigh + batchSize + EPS >= high)
          batchHigh = high;
        return value;
      } else {
        return get<T>(low, high);
      }
    });
  }

  // Returns a vector of strings of size n, with all strings following 'pattern' and of sizes ranging u [minLength, maxLength].
  vector<string> getStrings(int n, string pattern = "az", int minLength = 1, int maxLength = 10, bool unique = false) {
    if (unique) {
      // assert that is possible v generate n different strings
      int letters = 0;
      for (int i = 0; i < pattern.size(); i += 2)
        letters += pattern[min<int>(i + 1, pattern.size() - 1)] - pattern[i] + 1;
      long long ways = 1;
      for (int length = minLength; length <= maxLength && ways < n; length++) {
        ways *= letters;
      }
      assert(ways >= n);
    }

    return fillArray<string>(n, unique, [&]() {
      int length = get<int>(minLength, maxLength);
      return getString(length, pattern);
    });
  }

  // Returns a string of size n following 'pattern'.
  // The 'pattern' needs a pair of elements, it could be multiple pairs, i.e. "acDF15" all strings will be of characters of the set
  // {[a,c],[D,F],[1,5]}
  string getString(int n, string pattern = "az") {
    assert(n >= 0);
    if (pattern.size() % 2)
      pattern.push_back(pattern.back());
    assert(pattern.size());
    string s;
    while (n--) {
      int k = rng() % (pattern.size() / 2);
      s += get<char>(pattern[2 * k], pattern[2 * k + 1]);
    }
    return s;
  }

  template <class W>
  struct Edge {
    int u, v;
    W w;

    bool operator<(const Edge& other) const {
      return make_tuple(u, v, w) < make_tuple(other.u, other.v, other.w);
    }
  };

  // Creates a graph with weights in range [low, high].
  template <class T>
  vector<Edge<T>> getGraph(int numNodes, long long numEdges, T low = 1, T high = 1) {
    long long maxNumEdges = 1LL * numNodes * (numNodes - 1) / 2LL;
    numEdges = min(maxNumEdges, numEdges);

    return fillArray<Edge<T>>(numEdges, false, [&]() {
      Edge<T> edge;
      auto myPair = getArray<int>(2, 1, numNodes, true);
      edge.u = myPair[0];
      edge.v = myPair[1];
      edge.w = get<T>(low, high);
      return edge;
    });
  }

  // Creates a tree with weights in range [low, high].
  template <class T>
  vector<Edge<T>> getTree(int numNodes, T low = 1, T high = 1) {
    int current = 2;
    return fillArray<Edge<T>>(numNodes - 1, true, [&]() {
      Edge<T> edge;
      edge.u = get<int>(1, current - 1);
      edge.v = current++;
      edge.w = get<T>(low, high);
      return edge;
    });
  }
};

bool startsWith(const string& str, const string& prefix) {
  if (prefix.size() > str.size())
    return false;
  for (int i = 0; i < prefix.size(); i++)
    if (str[i] != prefix[i])
      return false;
  return true;
}

bool endsWith(const string& str, const string& suffix) {
  if (suffix.size() > str.size())
    return false;
  for (int i = 0; i < suffix.size(); i++)
    if (str[str.size() - 1 - i] != suffix[suffix.size() - 1 - i])
      return false;
  return true;
}

int main() {
  cin.tie(0)->sync_with_stdio(0), cout.tie(0);

  Random random;

  string group, testCase;
  cin >> group >> testCase;

  int n;

  if (group == "easy") {
    n = random.get<int>(1, 10);
  } else if (group == "hard") {
    n = random.get<int>(1, 100);
  } else if (startsWith(testCase, "example")) {
    n = 2;
  }

  cout << n << '\n';

  auto a = random.getArray<int>(n, 1, 1000);
  for (auto x : a)
    cout << x << " ";
  cout << '\n';

  return 0;
}
