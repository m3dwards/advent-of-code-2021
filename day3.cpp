#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <fstream>

using namespace std;

std::vector<bitset<12>> split(string text, char delim) {
    string line;
    vector<bitset<12>> vec;
    stringstream ss(text);
    while(std::getline(ss, line, delim)) {
        vec.push_back(bitset<12>(line));
    }
    return vec;
}

int main()
{
    std::string file_content;
    std::getline(std::ifstream("day3.txt"), file_content, '\0');

    auto inputVec = split(file_content, '\n');
    bitset<12> gamma = 0b00000;
    long total = 0;
    for (int i = 0; i < 12; i++) {
        bitset<12> gammaMask = 1 << i;
        for(auto b : inputVec) {
            total += (gammaMask & b).to_ulong();
        }
        if (total > (inputVec.size() >> 1) << i) {
            gamma = gamma | bitset<12>(1 << i);
        }
        total = 0;
    }
    cout << "part 1" << gamma.to_ulong() * (~gamma).to_ulong() << '\n';

    return 0;
}

