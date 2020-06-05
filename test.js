int solve(int arr[], int n) {
    int minOfArray = __INT_MAX__;
    for(int i = 0; i < n; i++) {
        if(arr[i] < minOfArray) {
            minOfArray = arr[i];
        }
    }

    int answer = 0;
    for(int i = 0; i < n; i++) {
        answer += (arr[i] - minOfArray);
    }

    return answer;
}