import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Dimensions, TouchableOpacity, Modal } from "react-native";
import { View } from "@/components/View";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";
import { Image } from "@/components/Image";
import { requestUtil } from "@/utils/RequestUtil";
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get("window");


type User = {
  id: string;
  name: string;
};

type RecipeImage = {
  id: string;
  url: string;
};

type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  owner: User;
  images: RecipeImage[];
  user_rate?: number;
  is_saved?: boolean;
};

const FeedItem = ({ item, height }: { item: Recipe; height: number }) => {
  const images = item.images ?? [];
  const [rating, setRating] = useState<number>(item.user_rate ?? 0);
  const [submitting, setSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(!!item.is_saved);

  const handleRate = async (value: number) => {
    setRating(value);
    setSubmitting(true);
    try {
      await requestUtil.post(`recipes/rates`, {
        recipeId: item.id,
        rate: value,
      });
    } catch (error) {}
    setSubmitting(false);
  };

  const handleSave = async () => {
    try {
      if (isSaved) {
        await requestUtil.delete(`recipes/saved/${item.id}`);
        setIsSaved(false);
      } else {
        await requestUtil.post(`recipes/saved/${item.id}`);
        setIsSaved(true);
      }
    } catch (error) {
    }
  };

  return (
    <View style={[styles.feedItemContainer, { height }]}>
      <View style={styles.ratingContainer}>
        {[1,2,3,4,5].map((val) => (
          <TouchableOpacity
            key={val}
            onPress={() => handleRate(val)}
            disabled={submitting}
            style={styles.starButton}
          >
            <MaterialCommunityIcons
              name={val <= rating ? "star" : "star-outline"}
              size={36}
              color={val <= rating ? "#FFD700" : "#FFF"}
            />
          </TouchableOpacity>
        ))}
      </View>
      {/* Images */}
      {images.length > 0 ? (
        <FlatList
          data={images}
          renderItem={({ item: image }) => {
            let uri = image.url;
            if (uri && !uri.startsWith("data:image/")) {
              uri = `data:image/jpeg;base64,${uri}`;
            }
            return (
              <Image
                source={{ uri }}
                style={[styles.image, { width, height }]}
              />
            );
          }}
          keyExtractor={(image) => image.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View style={{ width, height, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ text: styles.caption }} text="Sem imagem" />
        </View>
      )}
      {/* Overlay */}
      <View style={styles.overlay}>
        <Text style={{ text: styles.userName }} text={item.owner.name} />
        <Text style={{ text: styles.caption }} text={item.description} />
      </View>
      {/* Floating Buttons */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fabButton} onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons style={styles.fabButtonPot} name="pot" size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fabButton} onPress={handleSave}>
          <FontAwesome name={isSaved ? "flag" : "flag-o"} size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <FlatList
              data={[
                { key: 'ingredients', title: 'Ingredientes', content: item.ingredients || "Sem ingredientes" },
                { key: 'instructions', title: 'Instruções da Receita', content: item.instructions || "Sem instruções" }
              ]}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item: page }) => (
                <View style={{ width: width * 0.8, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.modalTitle} text={page.title} />
                  <View style={{ width: '100%', alignItems: 'flex-start' }}>
                    {page.key === 'ingredients'
                      ? page.content.split(',').map((line: string, idx: number) => (
                          <Text key={idx} style={styles.modalLine} text={line.trim()} />
                        ))
                      : page.content
                          .split(/(?=\d+\.)/)
                          .map((line: string, idx: number) => (
                            <Text key={idx} style={styles.modalLine} text={line.trim()} />
                          ))
                    }
                  </View>
                </View>
              )}
              keyExtractor={page => page.key}
              style={{ width: '100%' }}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText} text="Fechar" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const FeedScreen = () => {
  const [feedData, setFeedData] = useState<Recipe[]>([]);
  const [listHeight, setListHeight] = React.useState(0);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await requestUtil.get<Recipe[]>("recipes/feed");
        setFeedData(data || []);
      } catch (error) {
        console.error("Failed to fetch recipe feed:", error);
      }
    };

    fetchFeed();
  }, []);

  const itemHeight = listHeight;

  return (
    <FlatList
      data={feedData}
      renderItem={({ item }) => <FeedItem item={item} height={itemHeight} />}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      style={styles.container}
      onLayout={(e) => {
        setListHeight(e.nativeEvent.layout.height);
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.baseContent,
  },
  feedItemContainer: {
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "#000",
  },
  image: {
    resizeMode: "cover",
  },
  videoPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  videoPlaceholderText: {
    color: Colors.base100,
    fontSize: 24,
  },
  overlay: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  userName: {
    color: Colors.base100,
    fontWeight: "bold",
    fontSize: 16,
  },
  caption: {
    color: Colors.base100,
    marginTop: 5,
  },
  fabContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    bottom: 100,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 10,
  },
  fabButtonPot: {
    marginBottom: 7,
  },
  fabButton: {
    backgroundColor: Colors.primary || '#FF9800',
    borderRadius: 28,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  ratingContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starButton: {
    marginHorizontal: 4,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  modalInstructions: {
    fontSize: 16,
    color: '#444',
    marginBottom: 24,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: Colors.primary || '#FF9800',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalLine: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
});

export default FeedScreen;