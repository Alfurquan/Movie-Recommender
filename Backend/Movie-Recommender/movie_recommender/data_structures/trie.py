class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False
        self.orig = None
        
class Trie:
    def __init__(self):
        self.root = TrieNode()
        
    def insert(self, word, orig_word = None):
        """
        Insert word in the trie
        """
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
        node.orig = orig_word
        
    def find_prefix_node(self, prefix):
        """
        Find the node where the prefix ends.
        """
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

    def collect_words(self, node, prefix):
        """
        Recursively collect all words from the given node.
        """
        words = []
        if node.is_end_of_word:
            words.append(node.orig)
        
        for char, child_node in node.children.items():
            words.extend(self.collect_words(child_node, prefix + char))
        
        return words

    def words_with_prefix(self, prefix):
        """
        Return all words in the Trie that start with the given prefix.
        """
        node = self.find_prefix_node(prefix)
        if not node:
            return []
        
        return self.collect_words(node, prefix)