namespace GraphQlBackend.GraphQlRootTypes;

public class Subscription
{
    [Subscribe]
    [Topic(nameof(SomethingHappened))]
    public string SomethingHappened(
        [EventMessage] string someMessage
    )
    {
        return someMessage;
    }

    public static string GetSomethingHappenedTopic() => $"{nameof(SomethingHappened)}";
}